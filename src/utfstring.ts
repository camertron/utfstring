class UtfStringClass<T> {
    private static readonly surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

    private readonly graphemeClusterRegexes: RegExp[];

    private readonly graphemeClusterRegex: RegExp;

    public constructor(graphemeClusterRegexes: RegExp[], visual: T) {
        this.graphemeClusterRegexes = graphemeClusterRegexes;
        this.graphemeClusterRegex = this.createScanner([], "");
        this.visual = visual;
    }

    public visual: T;

    private findSurrogateByteIndex(str: string, charIndex: number): number {
        return this.scan(str, new RegExp(UtfStringClass.surrogatePairs.source, "g"), charIndex);
    }

    private scan(str: string, scanner: RegExp, charIndex: number): number {
        // optimization: don't iterate unless it's necessary
        if (!this.containsGraphemeClusterGroup(str)) {
            return charIndex;
        }

        let byteIndex = 0;
        let curCharIndex = 0;

        while (true) {
            const match = scanner.exec(str);
            const nextIdx = match ? match.index : str.length;

            while (curCharIndex < charIndex) {
                if (byteIndex === nextIdx) {
                    if (curCharIndex < charIndex) {
                        curCharIndex++;

                        if (match) {
                            byteIndex += match[0].length;
                        } else {
                            byteIndex++;
                        }
                    }

                    break;
                }

                byteIndex++;
                curCharIndex++;
            }

            if (curCharIndex === charIndex) {
                break;
            } else if (byteIndex >= str.length || !match) {
                return -1;
            }
        }

        return byteIndex;
    }

    private containsGraphemeClusterGroup(str: string): boolean {
        return this.graphemeClusterRegex.test(str);
    }

    private createScanner(extraSources?: string[], modifiers?: string): RegExp {
        if (extraSources === undefined) {
            extraSources = ["[^]"];
        }

        if (modifiers === undefined) {
            modifiers = "g";
        }

        let sources = new Array<string>();

        this.graphemeClusterRegexes.forEach(function (re) {
            sources.push(re.source);
        });

        sources.push(UtfStringClass.surrogatePairs.source);
        sources = sources.concat(extraSources);

        return new RegExp(sources.join("|"), modifiers);
    }

    public findCharIndex(str: string, byteIndex: number): number {
        if (byteIndex >= str.length) {
            return -1;
        }

        // optimization: don't iterate unless necessary
        if (!this.containsGraphemeClusterGroup(str)) {
            return byteIndex;
        }

        const scanner = this.createScanner();
        let charCount = 0;

        while (scanner.exec(str) !== null) {
            if (scanner.lastIndex > byteIndex) {
                break;
            }

            charCount++;
        }

        return charCount;
    }

    public findByteIndex(str: string, charIndex: number): number {
        if (charIndex >= this.length(str)) {
            return -1;
        }

        return this.scan(str, this.createScanner(), charIndex);
    }

    public charAt(str: string, index: number): string {
        const byteIndex = this.findByteIndex(str, index);

        if (byteIndex < 0 || byteIndex >= str.length) {
            return "";
        }

        const characters = str.slice(byteIndex, byteIndex + 8);
        const match = this.graphemeClusterRegex.exec(characters);

        if (match === null) {
            return characters[0];
        } else {
            return match[0];
        }
    }

    public charCodeAt(str: string, index: number): number {
        const byteIndex = this.findSurrogateByteIndex(str, index);

        if (byteIndex < 0) {
            return NaN;
        }

        const code = str.charCodeAt(byteIndex);

        if (0xd800 <= code && code <= 0xdbff) {
            const hi = code;
            const low = str.charCodeAt(byteIndex + 1);
            return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
        }

        return code;
    }

    public fromCharCode(charCode: number): string {
        if (charCode > 0xffff) {
            charCode -= 0x10000;

            return String.fromCharCode(0xd800 + (charCode >> 10), 0xdc00 + (charCode & 0x3ff));
        } else {
            return String.fromCharCode(charCode);
        }
    }

    public indexOf(str: string, searchValue: string, start?: number): number {
        if (typeof start === "undefined") {
            start = 0;
        }

        const startByteIndex = this.findByteIndex(str, start);
        const index = str.indexOf(searchValue, startByteIndex);

        if (index < 0) {
            return -1;
        } else {
            return this.findCharIndex(str, index);
        }
    }

    public lastIndexOf(str: string, searchValue: string, start?: number): number {
        let index: number;

        if (typeof start === "undefined") {
            index = str.lastIndexOf(searchValue);
        } else {
            const startByteIndex = this.findByteIndex(str, start);
            index = str.lastIndexOf(searchValue, startByteIndex);
        }

        if (index < 0) {
            return -1;
        } else {
            return this.findCharIndex(str, index);
        }
    }

    public slice(str: string, start: number, finish?: number): string {
        let startByteIndex = this.findByteIndex(str, start);

        if (startByteIndex < 0) {
            startByteIndex = str.length;
        }

        let finishByteIndex: number;

        if (typeof finish === "undefined") {
            finishByteIndex = str.length;
        } else {
            finishByteIndex = this.findByteIndex(str, finish);

            if (finishByteIndex < 0) {
                finishByteIndex = str.length;
            }
        }

        return str.slice(startByteIndex, finishByteIndex);
    }

    public substr(str: string, start: number, length?: number): string {
        if (start < 0) {
            start = this.length(str) + start;
        }

        if (typeof length === "undefined") {
            return this.slice(str, start);
        } else {
            return this.slice(str, start, start + length);
        }
    }

    public substring(str: string, start: number, length?: number): string {
        // they do the same thing
        return this.substr(str, start, length);
    }

    public length(str: string): number {
        // findCharIndex will return -1 if string is empty, so add 1
        return this.findCharIndex(str, str.length - 1) + 1;
    }

    public stringToCodePoints(str: string): number[] {
        const result = new Array<number>();

        for (let i = 0; i < str.length; i++) {
            const codePoint = this.charCodeAt(str, i);

            if (!codePoint) {
                break;
            }

            result.push(codePoint);
        }

        return result;
    }

    public codePointsToString(arr: number[]): string {
        const chars = new Array<string>();

        for (let i = 0; i < arr.length; i++) {
            chars.push(this.fromCharCode(arr[i]));
        }

        return chars.join("");
    }

    public stringToBytes(str: string): number[] {
        let result = new Array<number>();

        for (let i = 0; i < str.length; i++) {
            let chr = str.charCodeAt(i);
            const byteArray = new Array<number>();

            while (chr > 0) {
                byteArray.push(chr & 0xff);
                chr >>= 8;
            }

            // all utf-16 characters are two bytes
            if (byteArray.length === 1) {
                byteArray.push(0);
            }

            // assume big-endian
            result = result.concat(byteArray.reverse());
        }

        return result;
    }

    public bytesToString(arr: number[]): string {
        const result = new Array<string>();

        for (let i = 0; i < arr.length; i += 2) {
            const hi = arr[i];
            const low = arr[i + 1];
            const combined = (hi << 8) | low;
            result.push(String.fromCharCode(combined));
        }

        return result.join("");
    }

    public stringToCharArray(str: string): string[] {
        const result = new Array<string>();
        const scanner = this.createScanner();

        let match: RegExpExecArray | null;
        do {
            match = scanner.exec(str);

            if (match === null) {
                break;
            }

            result.push(match[0]);
        } while (match !== null);

        return result;
    }
}

const regionalIndicatorPairs = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;
const visual = new UtfStringClass([regionalIndicatorPairs], undefined);
const UtfString = new UtfStringClass([], visual);

export = UtfString;

// if there is a DOM add the object to the window object
if (typeof window !== "undefined" && window !== null) {
    (window as any).UtfString = UtfString;
}

