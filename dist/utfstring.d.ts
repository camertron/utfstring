/**
 * Class with UTF-safe string operations.
 * @template T Type used for the "visual" property of the class.
 */
declare class UtfStringClass<T = undefined> {
    /** Collection of regular expressions for matching regional indicators. */
    private readonly graphemeClusterRegexes;
    /** Regular expression matching surrogate pairs and regional indicators. */
    private readonly graphemeClusterRegex;
    /**
     * Creates a new object providing UTF-safe string operations.
     * @param graphemeClusterRegexes Collection of regular expressions for matching regional indicators.
     * @param visual An object that is stored as the "visual" property of the newly created object.
     */
    constructor(graphemeClusterRegexes: RegExp[], visual: T);
    /** Another version of the object that handles regional indicators as one character. */
    visual: T;
    /**
     * Returns the character at the given index from the given string.
     * @param str The string from which to get the character.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    charAt(str: string, index: number): string;
    /**
     * Returns the Unicode codepoint at the given index from the given string.
     * @param str The string from which to get the Unicode codepoint.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    charCodeAt(str: string, index: number): number;
    /**
     * Returns the string for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The string for the given Unicode codepoint.
     */
    fromCharCode(charCode: number): string;
    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    indexOf(str: string, searchValue: string, start?: number): number;
    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    lastIndexOf(str: string, searchValue: string, start?: number): number;
    /**
     * Returns the characters between the two given indices in the given string.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param finish The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    slice(str: string, start: number, finish?: number): string;
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    substr(str: string, start: number, length?: number): string;
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    substring(str: string, start: number, length?: number): string;
    /**
     * Returns the number of logical characters in the given string.
     * @param str The string whose length is calculated.
     * @returns The number of logical characters in the given string.
     */
    length(str: string): number;
    /**
     * Converts a string into an array of codepoints.
     * @param str The string that should be converted.
     * @returns The codepoints taken from the string.
     */
    stringToCodePoints(str: string): number[];
    /**
     * Converts an array of codepoints into a string.
     * @param arr The codepoints that should be converted.
     * @returns The string created from the codepoints.
     */
    codePointsToString(arr: number[]): string;
    /**
     * Converts a string into an array of UTF-16 bytes.
     * @param str The string that should be converted.
     * @returns The UTF-16 bytes created from the string.
     */
    stringToBytes(str: string): number[];
    /**
     * Converts an array of UTF-16 bytes into a string.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The string created from the array of UTF-16 bytes.
     */
    bytesToString(arr: number[]): string;
    /**
     * Converts the given string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @param str The string that should be converted.
     * @returns The array containing the individual logical characters taken from the string.
     */
    stringToCharArray(str: string): string[];
    /**
     * Finds the byte index for the given character index in the given string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param str The string in which to search the byte index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    findByteIndex(str: string, charIndex: number): number;
    /**
     * Finds the character index for the given byte index in the given string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param str The string in which to search the character index.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    findCharIndex(str: string, byteIndex: number): number;
    /**
     * Finds the byte index of a surrogate pair in the given string up until a specific character index.
     * @param str The string in which to search.
     * @param charIndex The character index up until which to search.
     * @returns The byte index of a surrogate pair in the given string.
     *          -1 if no surrogate pair was found.
     */
    private findSurrogateByteIndex;
    /**
     * Scans a given string starting up until a specific character index using a regular expression
     * and returns the byte index at which the scan found a match.
     * @param str The string that is scanned.
     * @param scanner The scanner that is used to scan the string.
     * @param charIndex The character index up until which the scan should be performed.
     * @returns The byte index at which the scan found a match.
     *          -1 if the scan did not find a match.
     */
    private scan;
    /**
     * Checks if the given string contains surrogate pairs or regional indicators.
     * @param str The string that is checked.
     * @returns True if the given string contains surrogate pairs or regional indicators, false otherwise.
     */
    private containsGraphemeClusterGroup;
    /**
     * Creates a regular expression for scanning strings.
     * @param extraSources Additional regular expressions that are added to the created regular expression.
     * @param modifiers Modifier flags for the created regular expression.
     * @returns The regular expression for scanning string.
     */
    private createScanner;
}
declare const UtfString: UtfStringClass<UtfStringClass<undefined>>;
export = UtfString;
