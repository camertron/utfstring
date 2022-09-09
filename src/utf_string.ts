/** Regular expression for matching surrogate pairs. */
export const surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
export function createSurrogatePairScanner(): RegExp {
    return new RegExp(surrogatePairs.source, "g");
}

/**
 * Creates a regular expression that matches every character of a string and is UTF-safe.
 * @returns The regular expression for matching every character of a string.
 */
export function createUtfSafeCharScannerHandlingSurrogatePairs(): RegExp {
    const sources = new Array<string>();

    sources.push(surrogatePairs.source);
    sources.push("[^]");

    return new RegExp(sources.join("|"), "g");
}

/**
 * Class with UTF-safe string operations.
 */
export class UtfString {
    /** The unsafe string for which the object is providing a UTF-safe interface. */
    private readonly unsafeString: string;

    /**
     * Creates a new UTF-safe string object.
     * @param unsafeString The unsafe string.
     */
    public constructor(unsafeString: string) {
        this.unsafeString = unsafeString;
    }

    /**
     * Returns the unsafe string the object is hiding.
     * @returns The unsafe string.
     */
    public toString(): string {
        return this.unsafeString;
    }

    /**
     * Returns the character at the given index from the string.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    public charAt(index: number): UtfString {
        const char = this.getClass().charAt(this.unsafeString, index);
        return new UtfString(char);
    }

    /**
     * Returns the character at the given index from the given string.
     * @param str The string from which to get the character.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    public static charAt(str: string, index: number): string {
        const byteIndex = this.findByteIndex(str, index);

        if (byteIndex < 0 || byteIndex >= str.length) {
            return "";
        }

        const characters = str.slice(byteIndex, byteIndex + 8);
        const scanner = this.createUtfSafeCharScanner();
        const match = scanner.exec(characters);

        return match === null ? characters[0] : match[0];
    }

    /**
     * Returns the Unicode codepoint at the given index.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    public charCodeAt(index: number): number {
        return this.getClass().charCodeAt(this.unsafeString, index);
    }

    /**
     * Returns the Unicode codepoint at the given index from the given string.
     * @param str The string from which to get the Unicode codepoint.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    public static charCodeAt(str: string, index: number): number {
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

    /**
     * Returns a UTF-safe string object for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The UTF-safe string object for the given Unicode codepoint.
     */
    public static fromCharCode(charCode: number): UtfString {
        return new this(this.stringFromCharCode(charCode));
    }

    /**
     * Returns the string for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The string for the given Unicode codepoint.
     */
    public static stringFromCharCode(charCode: number): string {
        if (charCode > 0xffff) {
            charCode -= 0x10000;
            return String.fromCharCode(0xd800 + (charCode >> 10), 0xdc00 + (charCode & 0x3ff));
        } else {
            return String.fromCharCode(charCode);
        }
    }

    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    public indexOf(searchValue: string | UtfString, start = 0): number {
        return this.getClass().indexOf(this.unsafeString, searchValue.toString(), start);
    }

    /**
     * Checks if the search value is within the string.
     * @param searchValue The value to search.
     * @returns True if the search value was found in the string, false otherwise.
     */
    public contains(searchValue: string | UtfString): boolean {
        return this.indexOf(searchValue) !== -1;
    }

    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    public static indexOf(str: string, searchValue: string, start = 0): number {
        const startByteIndex = this.findByteIndex(str, start);
        const index = str.indexOf(searchValue, startByteIndex);

        return index < 0 ? -1 : this.findCharIndex(str, index);
    }

    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    public lastIndexOf(searchValue: string | UtfString, start?: number): number {
        return this.getClass().lastIndexOf(this.unsafeString, searchValue.toString(), start);
    }

    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    public static lastIndexOf(str: string, searchValue: string, start?: number): number {
        let index: number;

        if (typeof start === "undefined") {
            index = str.lastIndexOf(searchValue);
        } else {
            const startByteIndex = this.findByteIndex(str, start);
            index = str.lastIndexOf(searchValue, startByteIndex);
        }

        return index < 0 ? -1 : this.findCharIndex(str, index);
    }

    /**
     * Returns the characters between the two given indices in the string.
     * @param start The index from which to start extracting the characters.
     * @param finish The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    public slice(start: number, finish?: number): UtfString {
        const str = this.getClass().slice(this.unsafeString, start, finish);
        return new UtfString(str);
    }

    /**
     * Returns the characters between the two given indices in the given string.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param finish The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    public static slice(str: string, start: number, finish?: number): string {
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

    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    public substr(start: number, length?: number): UtfString {
        const str = this.getClass().substr(this.unsafeString, start, length);
        return new UtfString(str);
    }

    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    public static substr(str: string, start: number, length?: number): string {
        if (start < 0) {
            start = this.lengthOf(str) + start;
        }

        if (typeof length === "undefined") {
            return this.slice(str, start);
        } else {
            return this.slice(str, start, start + length);
        }
    }

    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    public substring(start: number, length?: number): UtfString {
        return this.substr(start, length);
    }

    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    public static substring(str: string, start: number, length?: number): string {
        return this.substr(str, start, length);
    }

    /**
     * Returns the number of logical characters in the string.
     * @returns The number of logical characters in the string.
     */
    public get length(): number {
        return this.getClass().lengthOf(this.unsafeString);
    }

    /**
     * Returns the number of logical characters in the given string.
     * @param str The string whose length is calculated.
     * @returns The number of logical characters in the given string.
     */
    public static lengthOf(str: string): number {
        // findCharIndex will return -1 if string is empty, so add 1
        return this.findCharIndex(str, str.length - 1) + 1;
    }

    /**
     * Converts the string into an array of codepoints.
     * @returns The codepoints taken from the string.
     */
    public toCodePoints(): number [] {
        return this.getClass().stringToCodePoints(this.unsafeString);
    }

    /**
     * Converts a string into an array of codepoints.
     * @param str The string that should be converted.
     * @returns The codepoints taken from the string.
     */
    public static stringToCodePoints(str: string): number[] {
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

    /**
     * Converts an array of codepoints into a string.
     * @param arr The codepoints that should be converted.
     * @returns The string created from the codepoints.
     */
    public static codePointsToString(arr: number[]): string {
        const chars = arr.map((a) => this.stringFromCharCode(a));
        return chars.join("");
    }

    /**
     * Converts a string into an array of UTF-16 bytes.
     * @param str The string that should be converted.
     * @returns The UTF-16 bytes created from the string.
     */
    public static stringToBytes(str: string): number[] {
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

    /**
     * Converts an array of UTF-16 bytes into a string.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The string created from the array of UTF-16 bytes.
     */
    public static bytesToString(arr: number[]): string {
        const result = new Array<string>();

        for (let i = 0; i < arr.length; i += 2) {
            const hi = arr[i];
            const low = arr[i + 1];
            const combined = (hi << 8) | low;
            result.push(String.fromCharCode(combined));
        }

        return result.join("");
    }

    /**
     * Converts the given string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @param str The string that should be converted.
     * @returns The array containing the individual logical characters taken from the string.
     */
    public static stringToCharArray(str: string): string[] {
        const result = new Array<string>();
        const scanner = this.createUtfSafeCharScanner();

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

    /**
     * Finds the byte index for the given character index in the given string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param str The string in which to search the byte index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    public static findByteIndex(str: string, charIndex: number): number {
        if (charIndex >= this.lengthOf(str)) {
            return -1;
        }

        return this.scan(str, this.createUtfSafeCharScanner(), charIndex);
    }

    /**
     * Finds the character index for the given byte index in the given string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param str The string in which to search the character index.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    public static findCharIndex(str: string, byteIndex: number): number {
        if (byteIndex >= str.length) {
            return -1;
        }

        // optimization: don't iterate unless necessary
        if (!this.containsUnsafeUtfChars(str)) {
            return byteIndex;
        }

        const scanner = this.createUtfSafeCharScanner();
        let charCount = 0;

        while (scanner.exec(str) !== null) {
            if (scanner.lastIndex > byteIndex) {
                break;
            }

            charCount++;
        }

        return charCount;
    }

    /**
     * Finds the byte index of a surrogate pair in the given string up until a specific character index.
     * @param str The string in which to search.
     * @param charIndex The character index up until which to search.
     * @returns The byte index of a surrogate pair in the given string.
     *          -1 if no surrogate pair was found.
     */
    private static findSurrogateByteIndex(str: string, charIndex: number): number {
        return this.scan(str, createSurrogatePairScanner(), charIndex);
    }

    /**
     * Scans a given string up until a specific character index using a regular expression
     * and returns the byte index at which the scan found a match.
     * @param str The string that is scanned.
     * @param scanner The scanner that is used to scan the string.
     * @param charIndex The character index up until which the scan should be performed.
     * @returns The byte index at which the scan found a match.
     *          -1 if the scan did not find a match.
     */
    private static scan(str: string, scanner: RegExp, charIndex: number): number {
        // optimization: don't iterate unless it's necessary
        if (!this.containsUnsafeUtfChars(str)) {
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

    /**
     * Creates a char scanner that matches unsafe UTF chars.
     * @returns A char scanner that matches unsafe UTF chars.
     */
    protected static createUnsafeUtfCharFinder(): RegExp {
        return createSurrogatePairScanner();
    }

    /**
     * Creates a UTF-safe char scanner.
     * @returns A UTF-safe char scanner.
     */
    protected static createUtfSafeCharScanner(): RegExp {
        return createUtfSafeCharScannerHandlingSurrogatePairs();
    }

    /**
     * Checks if the given string contains surrogate pairs.
     * @param str The string that is checked.
     * @returns True if the given string contains surrogate pairs, false otherwise.
     */
    private static containsUnsafeUtfChars(str: string): boolean {
        const scanner = this.createUnsafeUtfCharFinder();
        return scanner.test(str);
    }

    /**
     * Returns the constructor function of this object.
     * @returns The constructor function of this object.
     */
    private getClass(): typeof UtfString {
        // gets the constructor function at runtime and therefore also works in derived classes
        return Object.getPrototypeOf(this).constructor;
    }
}

