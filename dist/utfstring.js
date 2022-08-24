"use strict";
/** Regular expression for matching surrogate pairs. */
var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
/** Regular expression for matching regional indicator pairs. */
var regionalIndicatorPairs = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;
/**
 * Class with UTF-safe string operations.
 * @template T Type used for the "visual" property of the class.
 */
var UtfStringClass = /** @class */ (function () {
    /**
     * Creates a new object providing UTF-safe string operations.
     * @param graphemeClusterRegexes Collection of regular expressions for matching regional indicators.
     * @param visual An object that is stored as the "visual" property of the newly created object.
     */
    function UtfStringClass(graphemeClusterRegexes, visual) {
        this.graphemeClusterRegexes = graphemeClusterRegexes;
        this.graphemeClusterRegex = this.createScanner([], "");
        this.visual = visual;
    }
    /**
     * Returns the character at the given index from the given string.
     * @param str The string from which to get the character.
     * @param index The index of the wanted character.
     * @returns The character at the given index.
     */
    UtfStringClass.prototype.charAt = function (str, index) {
        var byteIndex = this.findByteIndex(str, index);
        if (byteIndex < 0 || byteIndex >= str.length) {
            return "";
        }
        var characters = str.slice(byteIndex, byteIndex + 8);
        var match = this.graphemeClusterRegex.exec(characters);
        return match === null ? characters[0] : match[0];
    };
    /**
     * Returns the Unicode codepoint at the given index from the given string.
     * @param str The string from which to get the Unicode codepoint.
     * @param index The index of the wanted Unicode codepoint.
     * @returns The Unicode codepoint at the given index.
     */
    UtfStringClass.prototype.charCodeAt = function (str, index) {
        var byteIndex = this.findSurrogateByteIndex(str, index);
        if (byteIndex < 0) {
            return NaN;
        }
        var code = str.charCodeAt(byteIndex);
        if (0xd800 <= code && code <= 0xdbff) {
            var hi = code;
            var low = str.charCodeAt(byteIndex + 1);
            return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
        }
        return code;
    };
    /**
     * Returns the string for the given Unicode codepoint.
     * @param charCode The Unicode codepoint.
     * @returns The string for the given Unicode codepoint.
     */
    UtfStringClass.prototype.fromCharCode = function (charCode) {
        if (charCode > 0xffff) {
            charCode -= 0x10000;
            return String.fromCharCode(0xd800 + (charCode >> 10), 0xdc00 + (charCode & 0x3ff));
        }
        else {
            return String.fromCharCode(charCode);
        }
    };
    /**
     * Finds the first instance of the search value within the string. Starts at an optional offset.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The first instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    UtfStringClass.prototype.indexOf = function (str, searchValue, start) {
        if (start === void 0) { start = 0; }
        var startByteIndex = this.findByteIndex(str, start);
        var index = str.indexOf(searchValue, startByteIndex);
        return index < 0 ? -1 : this.findCharIndex(str, index);
    };
    /**
     * Finds the last instance of the search value within the string.
     * Starts searching backwards at an optional offset, which can be negative.
     * @param str The string in which to search for the value.
     * @param searchValue The value to search.
     * @param start Optional start offset for the search.
     * @returns The last instance of the search value within the string.
     *          -1 if the search value could not be found.
     */
    UtfStringClass.prototype.lastIndexOf = function (str, searchValue, start) {
        var index;
        if (typeof start === "undefined") {
            index = str.lastIndexOf(searchValue);
        }
        else {
            var startByteIndex = this.findByteIndex(str, start);
            index = str.lastIndexOf(searchValue, startByteIndex);
        }
        return index < 0 ? -1 : this.findCharIndex(str, index);
    };
    /**
     * Returns the characters between the two given indices in the given string.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param finish The index at which to end extracting the characters.
     * @returns The characters between the two given indices.
     */
    UtfStringClass.prototype.slice = function (str, start, finish) {
        var startByteIndex = this.findByteIndex(str, start);
        if (startByteIndex < 0) {
            startByteIndex = str.length;
        }
        var finishByteIndex;
        if (typeof finish === "undefined") {
            finishByteIndex = str.length;
        }
        else {
            finishByteIndex = this.findByteIndex(str, finish);
            if (finishByteIndex < 0) {
                finishByteIndex = str.length;
            }
        }
        return str.slice(startByteIndex, finishByteIndex);
    };
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    UtfStringClass.prototype.substr = function (str, start, length) {
        if (start < 0) {
            start = this.length(str) + start;
        }
        if (typeof length === "undefined") {
            return this.slice(str, start);
        }
        else {
            return this.slice(str, start, start + length);
        }
    };
    /**
     * Returns the characters starting at the given start index up to the start index plus the given length.
     * @param str The string from which to extract the characters.
     * @param start The index from which to start extracting the characters.
     * @param length The number of characters to extract.
     * @returns The characters starting at the given start index up to the start index plus the given length.
     */
    UtfStringClass.prototype.substring = function (str, start, length) {
        return this.substr(str, start, length);
    };
    /**
     * Returns the number of logical characters in the given string.
     * @param str The string whose length is calculated.
     * @returns The number of logical characters in the given string.
     */
    UtfStringClass.prototype.length = function (str) {
        // findCharIndex will return -1 if string is empty, so add 1
        return this.findCharIndex(str, str.length - 1) + 1;
    };
    /**
     * Converts a string into an array of codepoints.
     * @param str The string that should be converted.
     * @returns The codepoints taken from the string.
     */
    UtfStringClass.prototype.stringToCodePoints = function (str) {
        var result = new Array();
        for (var i = 0; i < str.length; i++) {
            var codePoint = this.charCodeAt(str, i);
            if (!codePoint) {
                break;
            }
            result.push(codePoint);
        }
        return result;
    };
    /**
     * Converts an array of codepoints into a string.
     * @param arr The codepoints that should be converted.
     * @returns The string created from the codepoints.
     */
    UtfStringClass.prototype.codePointsToString = function (arr) {
        var _this = this;
        var chars = arr.map(function (a) { return _this.fromCharCode(a); });
        return chars.join("");
    };
    /**
     * Converts a string into an array of UTF-16 bytes.
     * @param str The string that should be converted.
     * @returns The UTF-16 bytes created from the string.
     */
    UtfStringClass.prototype.stringToBytes = function (str) {
        var result = new Array();
        for (var i = 0; i < str.length; i++) {
            var chr = str.charCodeAt(i);
            var byteArray = new Array();
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
    };
    /**
     * Converts an array of UTF-16 bytes into a string.
     * @param arr The array of UTF-16 bytes that should be converted.
     * @returns The string created from the array of UTF-16 bytes.
     */
    UtfStringClass.prototype.bytesToString = function (arr) {
        var result = new Array();
        for (var i = 0; i < arr.length; i += 2) {
            var hi = arr[i];
            var low = arr[i + 1];
            var combined = (hi << 8) | low;
            result.push(String.fromCharCode(combined));
        }
        return result.join("");
    };
    /**
     * Converts the given string into an array of individual logical characters.
     * Note that each entry in the returned array may be more than one UTF-16 character.
     * @param str The string that should be converted.
     * @returns The array containing the individual logical characters taken from the string.
     */
    UtfStringClass.prototype.stringToCharArray = function (str) {
        var result = new Array();
        var scanner = this.createScanner();
        var match;
        do {
            match = scanner.exec(str);
            if (match === null) {
                break;
            }
            result.push(match[0]);
        } while (match !== null);
        return result;
    };
    /**
     * Finds the byte index for the given character index in the given string.
     * Note: a "byte index" is really a "JavaScript string index", not a true byte offset.
     * Use this function to convert a UTF character boundary to a JavaScript string index.
     * @param str The string in which to search the byte index.
     * @param charIndex The character index for which to find the byte index.
     * @returns The byte index for the character index in the string.
     *          -1 if the character index is equal to or higher than the length of the string.
     */
    UtfStringClass.prototype.findByteIndex = function (str, charIndex) {
        if (charIndex >= this.length(str)) {
            return -1;
        }
        return this.scan(str, this.createScanner(), charIndex);
    };
    /**
     * Finds the character index for the given byte index in the given string.
     * Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset.
     * Use this function to convert a JavaScript string index to (the closest) UTF character boundary.
     * @param str The string in which to search the character index.
     * @param byteIndex The byte index for which to find the character index.
     * @returns The character index for the byte index in the string.
     *          -1 if the byte index is equal to or higher than the number of bytes in the string.
     */
    UtfStringClass.prototype.findCharIndex = function (str, byteIndex) {
        if (byteIndex >= str.length) {
            return -1;
        }
        // optimization: don't iterate unless necessary
        if (!this.containsGraphemeClusterGroup(str)) {
            return byteIndex;
        }
        var scanner = this.createScanner();
        var charCount = 0;
        while (scanner.exec(str) !== null) {
            if (scanner.lastIndex > byteIndex) {
                break;
            }
            charCount++;
        }
        return charCount;
    };
    /**
     * Finds the byte index of a surrogate pair in the given string up until a specific character index.
     * @param str The string in which to search.
     * @param charIndex The character index up until which to search.
     * @returns The byte index of a surrogate pair in the given string.
     *          -1 if no surrogate pair was found.
     */
    UtfStringClass.prototype.findSurrogateByteIndex = function (str, charIndex) {
        return this.scan(str, new RegExp(surrogatePairs.source, "g"), charIndex);
    };
    /**
     * Scans a given string up until a specific character index using a regular expression
     * and returns the byte index at which the scan found a match.
     * @param str The string that is scanned.
     * @param scanner The scanner that is used to scan the string.
     * @param charIndex The character index up until which the scan should be performed.
     * @returns The byte index at which the scan found a match.
     *          -1 if the scan did not find a match.
     */
    UtfStringClass.prototype.scan = function (str, scanner, charIndex) {
        // optimization: don't iterate unless it's necessary
        if (!this.containsGraphemeClusterGroup(str)) {
            return charIndex;
        }
        var byteIndex = 0;
        var curCharIndex = 0;
        while (true) {
            var match = scanner.exec(str);
            var nextIdx = match ? match.index : str.length;
            while (curCharIndex < charIndex) {
                if (byteIndex === nextIdx) {
                    if (curCharIndex < charIndex) {
                        curCharIndex++;
                        if (match) {
                            byteIndex += match[0].length;
                        }
                        else {
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
            }
            else if (byteIndex >= str.length || !match) {
                return -1;
            }
        }
        return byteIndex;
    };
    /**
     * Checks if the given string contains surrogate pairs or regional indicators.
     * @param str The string that is checked.
     * @returns True if the given string contains surrogate pairs or regional indicators, false otherwise.
     */
    UtfStringClass.prototype.containsGraphemeClusterGroup = function (str) {
        return this.graphemeClusterRegex.test(str);
    };
    /**
     * Creates a regular expression for scanning strings.
     * @param extraSources Additional regular expressions that are added to the created regular expression.
     * @param modifiers Modifier flags for the created regular expression.
     * @returns The regular expression for scanning string.
     */
    UtfStringClass.prototype.createScanner = function (extraSources, modifiers) {
        if (extraSources === undefined) {
            extraSources = ["[^]"];
        }
        if (modifiers === undefined) {
            modifiers = "g";
        }
        var sources = new Array();
        this.graphemeClusterRegexes.forEach(function (re) {
            sources.push(re.source);
        });
        sources.push(surrogatePairs.source);
        sources = sources.concat(extraSources);
        return new RegExp(sources.join("|"), modifiers);
    };
    return UtfStringClass;
}());
var visual = new UtfStringClass([regionalIndicatorPairs], undefined);
var UtfString = new UtfStringClass([], visual);
// if there is a DOM add the object to the window object
if (typeof window !== "undefined" && window !== null) {
    window.UtfString = UtfString;
}
module.exports = UtfString;
