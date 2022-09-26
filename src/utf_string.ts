import { isDefined, isNumber } from "./utils";

/** Regular expression for matching surrogate pairs. */
export const surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
function createSurrogatePairScanner(): RegExp {
    return new RegExp(surrogatePairs.source, "g");
}

/**
 * Creates a regular expression that matches every character of a string and is UTF-safe.
 * @returns The regular expression for matching every character of a string.
 */
function createUtfSafeCharScannerHandlingSurrogatePairs(): RegExp {
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
     * Iterator that enables the usage of for-of loops on instances of this class.
     * @returns An iterator that returns each character in the string separately.
     */
    *[Symbol.iterator](): IterableIterator<UtfString> {
        for (let i = 0; i < this.length; ++i) {
            yield this.charAt(i);
        }
    }

    /**
     * Returns the character at the given index from the string.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    public charAt(index: number): UtfString {
        const ctor = this.getClass();
        const char = ctor.charAt(this.unsafeString, index);
        return new ctor(char);
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
     * Returns the Unicode codepoint at the given index.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    public codePointAt(index: number): number {
        return this.getClass().charCodeAt(this.unsafeString, index);
    }

    /**
     * Creates a new UTF-safe string object by concatenating the given strings.
     * @param arr The strings to concatenate.
     * @returns A new UTF-safe string object with the concatenated strings.
     */
    public concat(...arr: Array<unknown>): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString + arr.map((x) => String(x)).join(""));
    }

    /**
     * Determines whether the string ends with the characters of a specified search string.
     * @param str The characters to be searched for at the end of the string.
     * @param endPos The end position at which the search string is expected to be found.
     * @returns True if the string ends with the given search string, false otherwise.
     */
    public endsWith(str: string | UtfString, endPos?: number): boolean {
        return this.unsafeString.endsWith(str.toString(), endPos);
    }

    /**
     * Checks if the given string equals the string.
     * @param str The string to compare.
     * @returns True if the strings are equals, false otherwise.
     */
    public equals(str: string | UtfString): boolean {
        return this.unsafeString === str?.toString();
    }

    /**
     * Finds the byte index for the given character index in the string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    public findByteIndex(charIndex: number): number {
        return this.getClass().findByteIndex(this.unsafeString, charIndex);
    }

    /**
     * Finds the character index for the given byte index in the string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    public findCharIndex(byteIndex: number): number {
        return this.getClass().findCharIndex(this.unsafeString, byteIndex);
    }

    /**
     * Checks if the search value is within the string.
     * @param searchValue The value to search.
     * @returns True if the search value was found in the string, false otherwise.
     */
    public includes(searchValue: string | UtfString): boolean {
        return this.indexOf(searchValue) !== -1;
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
     * Returns the number of logical characters in the string.
     * @returns The number of logical characters in the string.
     */
    public get length(): number {
        return this.getClass().lengthOf(this.unsafeString);
    }

    /**
     * Matches a string or an object that supports being matched against, and returns an array
     * containing the results of that search, or null if no matches are found.
     * @param matcher An object that supports being matched against.
     */
    public match(
        matcher: string | UtfString | RegExp | { [Symbol.match](string: string): RegExpMatchArray | null },
    ): RegExpMatchArray | null;
    public match(matcher: string | UtfString): RegExpMatchArray | null {
        return this.toString().match(matcher instanceof UtfString ? matcher.toString() : matcher);
    }

    /**
     * Creates a new UTF-safe string object by padding the string with a given string (repeated, if needed)
     * so that the resulting string reaches a given length. The padding is applied at the end of the string.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new UTF-safe string object of the specified target length with the padding string applied at the end.
     */
    public padEnd(targetLength: number, padString?: string | UtfString): UtfString {
        const ctor = this.getClass();
        return new ctor(ctor.padEnd(this.unsafeString, targetLength, padString?.toString()));
    }

    /**
     * Creates a new UTF-safe string object by padding the string with a given string (repeated, if needed)
     * so that the resulting string reaches a given length. The padding is applied at the start of the string.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new UTF-safe string object of the specified target length
     *          with the padding string applied at the start.
     */
    public padStart(targetLength: number, padString?: string | UtfString): UtfString {
        const ctor = this.getClass();
        return new ctor(ctor.padStart(this.unsafeString, targetLength, padString?.toString()));
    }

    /**
     * Returns a new string which contains the specified number of copies of the string on which it was called.
     * @param count The number of times the string should be repeated.
     * @returns The new string which contains a specified number of copies of the original string.
     */
    public repeat(count: number): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.repeat(count));
    }

    /**
     * Creates a new UTF-safe string object with one, some, or all matches of a pattern replaced by a replacement.
     * The pattern can be a string or a RegExp, and the replacement can be a string or a function called for each match.
     * If pattern is a string, only the first occurrence will be replaced.
     * @param pattern The pattern that should be replaced within the string.
     * @param replacement This replaces the strings matched by the pattern.
     * @returns A new UTF-safe string object with the pattern occurrences replaced by the given replacement.
     */
    public replace(
        pattern: string | UtfString | RegExp | { [Symbol.replace](string: string, replaceValue: string): string },
        replacement: string | UtfString | ((substring: string, ...args: any[]) => string),
    ): UtfString;
    public replace(pattern: string | UtfString, replacement: string | UtfString): UtfString {
        if (pattern instanceof UtfString) {
            pattern = pattern.toString();
        }
        if (replacement instanceof UtfString) {
            replacement = replacement.toString();
        }

        const ctor = this.getClass();
        return new ctor(this.unsafeString.replace(pattern, replacement));
    }

    /**
     * Returns the characters between the two given indices in the string.
     * @param start The index from which to start extracting the characters.
     * @param finish The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    public slice(start?: number, finish?: number): UtfString {
        const ctor = this.getClass();
        const str = ctor.slice(this.unsafeString, start, finish);
        return new ctor(str);
    }

    /**
     * Split a string into substrings using the specified separator and return them as an array.
     * @param separator The pattern describing where each split should occur.
     *                  If omitted, a single-element array containing the entire string is returned.
     * @param limit A value used to limit the number of elements returned in the array.
     */
    public split(
        seperator: string | UtfString | RegExp | { [Symbol.split](string: string, limit?: number): string[] },
        limit?: number,
    ): UtfString[];
    public split(seperator: string, limit?: number): UtfString[] {
        if (seperator === "") {
            return [...this].slice(0, limit);
        }
        const ctor = this.getClass();
        return this.unsafeString.split(seperator, limit).map((str) => new ctor(str));
    }

    /**
     * Determines whether the string starts with the characters of a specified search string.
     * @param str The characters to be searched for at the start of the string.
     * @param startPos The start position at which the search string is expected to be found.
     * @returns True if the string starts with the given search string, false otherwise.
     */
    public startsWith(str: string | UtfString, startPos?: number): boolean {
        return this.unsafeString.startsWith(str.toString(), startPos);
    }

    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    public substr(start?: number, length?: number): UtfString {
        const ctor = this.getClass();
        const str = ctor.substr(this.unsafeString, start, length);
        return new ctor(str);
    }

    /**
     * Returns the characters starting at the given start index up to the end index.
     * @param start The index from which to start extracting the characters.
     * @param end The index to which characters are extracted.
     * @returns The characters starting at the given start index up to the end index.
     */
    public substring(start?: number, end?: number): UtfString {
        const ctor = this.getClass();
        const str = ctor.substring(this.unsafeString, start, end);
        return new ctor(str);
    }

    /**
     * Converts the string into an array of UTF-16 bytes.
     * @returns The UTF-16 bytes created from the string.
     */
    public toBytes(): number[] {
        return this.getClass().stringToBytes(this.unsafeString);
    }

    /**
     * Converts the string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @returns The array containing the individual logical characters taken from the string.
     */
    public toCharArray(): string[] {
        return this.getClass().stringToCharArray(this.unsafeString);
    }

    /**
     * Converts the string into an array of codepoints.
     * @returns The codepoints taken from the string.
     */
    public toCodePoints(): number[] {
        return this.getClass().stringToCodePoints(this.unsafeString);
    }

    /**
     * Converts all the alphabetic characters in the string to lower case.
     * @return A new string object in which all alphabetic characters are in lower case.
     */
    public toLowerCase(): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.toLowerCase());
    }

    /**
     * Returns the unsafe string the object is hiding.
     * @returns The unsafe string.
     */
    public toString(): string {
        return this.unsafeString;
    }

    /**
     * Converts all the alphabetic characters in the string to upper case.
     * @return A new string object in which all alphabetic characters are in upper case.
     */
    public toUpperCase(): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.toUpperCase());
    }

    /**
     * Removes whitespace from both ends of the string and returns a new string, without modifying the original string.
     * @returns A new string object without any whitespace at the beginning or the end.
     */
    public trim(): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trim());
    }

    /**
     * Removes whitespace from the end of the string and returns a new string, without modifying the original string.
     * @return A new string object without any whitespace at the end.
     */
    public trimEnd(): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimEnd());
    }

    /**
     * Removes whitespace from the beginning of the string and returns a new string,
     * without modifying the original string.
     * @return A new string object without any whitespace at the beginning.
     */
    public trimLeft(): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimLeft());
    }

    /**
     * Removes whitespace from the end of the string and returns a new string, without modifying the original string.
     * @return A new string object without any whitespace at the end.
     */
    public trimRight(): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimRight());
    }

    /**
     * Removes whitespace from the beginning of the string and returns a new string,
     * without modifying the original string.
     * @return A new string object without any whitespace at the beginning.
     */
    public trimStart(): UtfString {
        const ctor = this.getClass();
        return new ctor(this.unsafeString.trimStart());
    }

    /**
     * Returns the constructor function of this object.
     * @returns The constructor function of this object.
     */
    private getClass(): typeof UtfString {
        // gets the constructor function at runtime and therefore also works in derived classes
        return Object.getPrototypeOf(this).constructor;
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
     * Returns the character at the given index from the given string.
     * @param str The string from which to get the character.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    public static charAt(str: string, index: number): string {
        const byteIndex = this.findByteIndex(str, index);

        if (byteIndex < 0) {
            return "";
        }

        const characters = str.slice(byteIndex, byteIndex + 8);
        const scanner = this.createUtfSafeCharScanner();
        const match = scanner.exec(characters);

        return match === null ? characters[0] : match[0];
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
     * Converts an array of codepoints into a string.
     * @param arr The codepoints that should be converted.
     * @returns The string created from the codepoints.
     */
    public static codePointsToString(arr: number[]): string {
        const chars = arr.map((a) => this.stringFromCharCode(a));
        return chars.join("");
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
     * Converts an array of UTF-16 bytes into a UTF-safe string object.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The UTF-safe string object created from the array of UTF-16 bytes.
     */
    public static fromBytes(arr: number[]): UtfString {
        return new this(this.bytesToString(arr));
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
     * Converts an array of codepoints into a UTF-safe string object.
     * @param arr The codepoints that should be converted.
     * @returns The UTF-safe string object created from the codepoints.
     */
    public static fromCodePoints(arr: number[]): UtfString {
        return new this(this.codePointsToString(arr));
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
     * Concatenates the strings from the given array into a new string.
     * @param items The array of strings which are joined.
     * @param seperator The seperator string inserted between the concatenated strings.
     * @returns A new string object that contains the concatenated strings from the given array.
     */
    public static join(
        items: ({ toString(): string } | undefined | null)[],
        seperator: UtfString | string = ",",
    ): UtfString {
        const text = items.map((x) => (isDefined(x) ? x.toString() : "")).join(seperator.toString());
        return new this(text);
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

        if (!isDefined(start)) {
            index = str.lastIndexOf(searchValue);
        } else {
            const startByteIndex = this.findByteIndex(str, start);
            index = str.lastIndexOf(searchValue, startByteIndex);
        }

        return index < 0 ? -1 : this.findCharIndex(str, index);
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
     * Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string
     * reaches a given length. The padding is applied at the end of the string.
     * @param str The string that should be padded to the target length.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new string of the specified target length with the padding string applied at the end.
     */
    public static padEnd(str: string, targetLength: number, padString?: string): string {
        if (targetLength <= this.lengthOf(str)) {
            return str;
        }

        if (!padString) {
            padString = " ";
        }

        let iPadStr = 0;
        let newStr = str;

        do {
            newStr += this.charAt(padString, iPadStr);
            ++iPadStr;

            if (iPadStr >= this.lengthOf(padString)) {
                iPadStr = 0;
            }
        } while (this.lengthOf(newStr) < targetLength);

        return newStr;
    }

    /**
     * Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string
     * reaches a given length. The padding is applied at the start of the string.
     * @param str The string that should be padded to the target length.
     * @param targetLength The length of the resulting string once the string has been padded.
     * @param padString The string to pad the string with.
     * @returns A new string of the specified target length with the padding string applied at the start.
     */
    public static padStart(str: string, targetLength: number, padString?: string): string {
        if (targetLength <= this.lengthOf(str)) {
            return str;
        }

        if (!padString) {
            padString = " ";
        }

        let iPadStr = 0;
        let fullPadding = "";

        do {
            fullPadding += this.charAt(padString, iPadStr);
            ++iPadStr;

            if (iPadStr >= this.lengthOf(padString)) {
                iPadStr = 0;
            }
        } while (this.lengthOf(fullPadding + str) < targetLength);

        return fullPadding + str;
    }

    /**
     * Returns the characters between the two given indices in the given string.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param end The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    public static slice(str: string, start?: number, end?: number): string {
        if (!isNumber(start)) {
            start = 0;
        } else if (start < 0) {
            start = this.lengthOf(str) + start;
        }

        if (!isNumber(end) || end >= this.lengthOf(str)) {
            end = str.length;
        } else if (end < 0) {
            end = this.lengthOf(str) + end;
        }

        let startByteIndex = this.findByteIndex(str, start);
        if (startByteIndex < 0) {
            startByteIndex = str.length;
        }

        let finishByteIndex = this.findByteIndex(str, end);
        if (finishByteIndex < 0) {
            finishByteIndex = str.length;
        }

        return str.slice(startByteIndex, finishByteIndex);
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
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    public static substr(str: string, start?: number, length?: number): string {
        if (!isNumber(start)) {
            start = 0;
        }

        if (isDefined(length)) {
            if (isNaN(length)) {
                length = 0;
            }
            if (length <= 0) {
                return "";
            }
        }

        if (start < 0) {
            start = Math.max(this.lengthOf(str) + start, 0);
        }

        if (!isDefined(length)) {
            return this.slice(str, start);
        } else {
            return this.slice(str, start, start + length);
        }
    }

    /**
     * Returns the characters starting at the given start index up to the end index.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param end The index to which characters are extracted.
     * @returns The characters starting at the given start index up to the end index.
     */
    public static substring(str: string, start?: number, end?: number): string {
        if (!isNumber(start) || start < 0) {
            start = 0;
        }

        if (!isDefined(end)) {
            end = this.lengthOf(str);
        } else if (isNaN(end)) {
            end = 0;
        } else if (end < 0) {
            end = 0;
        }

        if (start > end) {
            [start, end] = [end, start];
        }
        return this.slice(str, start, end);
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
     * Checks if the given string contains surrogate pairs.
     * @param str The string that is checked.
     * @returns True if the given string contains surrogate pairs, false otherwise.
     */
    private static containsUnsafeUtfChars(str: string): boolean {
        const scanner = this.createUnsafeUtfCharFinder();
        return scanner.test(str);
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
}
