[![NPM Version](https://img.shields.io/npm/v/utfstring?color=33cd56&logo=npm)](https://www.npmjs.com/package/utfstring)

utfstring
===

UTF-safe string operations for Javascript.

## What is this thing?

Javascript strings work great for holding text in English and other Latin-based languages, but they fall short when it comes to languages in Unicode's [astral plane](https://en.wikipedia.org/wiki/Plane_(Unicode)).

Consider this Javascript code. What number does `len` contain?

```javascript
var str = '𤔣';
var len = str.length;
```
If you said `1`, you're clearly a hopeful idealist. In fact, `len` contains `2`. To explain why this is, we need to understand a few things about the Unicode standard.

### Some History

Unicode isn't all that complicated. It's just a huge series of numbers, called "codepoints," one for each logical character. Unicode includes character sets for ideographic languages like Chinese, nearly [1,800 emojis](http://unicode.org/emoji/charts/full-emoji-list.html), and characters for scripts like Cherokee, Amharic, Greek, and Georgian (just to name a few). There are literally hundreds of thousands of characters specified in the Unicode standard.

#### Encoding

Encoding is the process of converting Unicode codepoints into binary data that can be written or transmitted by a computer system. Javascript strings are encoded in UTF-16, meaning every character takes up 16 bits, or 2 bytes (there are 8 bits per byte). The problem is that not every Unicode character can be encoded in 2 bytes, since 2<sup>16</sup> is only 65536 - not nearly enough space to represent each of the hundreds of thousands of Unicode characters.

#### Javascript's Solution

To mitigate this problem, Javascript (as well as other languages and platforms that use UTF-16 encoding) makes use of what are called "surrogate pairs." Surrogate pairs are two encoded characters that represent a single logical character. Together they are 4 bytes wide and can represent every Unicode character (2<sup>32</sup> = 4,294,967,296).

Unfortunately, that's where the good news ends. Javascript still counts each group of two bytes as a character, meaning any character made up of a surrogate pair looks like two logical characters to Javascript instead of just one. That's why `len` contains `2` in the example above.

Javascript's inability to correctly count surrogate pairs means a bunch of its string operations aren't safe to perform on foreign characters. This includes such favorites as `indexOf`, `slice`, and `substr`.

This library contains a number of UTF-safe string operations, including the ones I just mentioned. These operations respect surrogate pairs to ensure you're not caught off guard.

## Installation

UtfString is designed to be used in node.js or in the browser.

In node:

```javascript
import { UtfString } from "utfstring";

var safeString = new UtfString("𤔣");
console.log(safeString.length); // 1
```

In the browser, `UtfString` will be available on `window` after you import the Javascript file from the `browser` folder:

```html
<script src="utfstring.js"></script>
<script>
    var safeString = new UtfString("𤔣");
    console.log(safeString.length); // 1
</script>
```

## Usage

UtfString is a class that you can use to create UTF-safe string objects. These objects currently support the following operations:

* `constructor(String str)` - Creates a new UTF-safe string object.

* `*[Symbol.iterator]` - Allows you to iterate over the characters of the string using a `for-of` loop.

* `charAt(Integer index)` - Returns the character at the given index from the string.

* `charCodeAt(Integer index)` - Returns the Unicode codepoint at the given index.

* `codePointAt(Integer index)` - Same as `charCodeAt`.

* `concat(Array arr)` - Creates a new UTF-safe string object by concatenating the given strings.

* `endsWith(String str, [Integer endPos])` - Determines whether the string ends with the characters of a specified search string.

* `equals(String str)` - Checks if the given string equals the string.

* `findByteIndex(Integer charIndex)` - Finds the byte index for the given character index in the string. Note: a "byte index" is really a "JavaScript string index", not a true byte offset. Use this function to convert a UTF character boundary to a JavaScript string index.

* `findCharIndex(Integer byteIndex)` - Finds the character index for the given byte index. Note: a "byte index" is really a "JavaSciprt string index", not a true byte offset. Use this function to convert a JavaScript string index to (the closest) UTF character boundary.

* `includes(String str)` - Checks if the search value is within the string.

* `indexOf(String searchValue, [Integer start])` - Finds the first instance of the search value within the string. Starts at an optional offset.

* `lastIndexOf(String searchValue, [Integer start])` - Finds the last instance of the search value within the string. Starts searching backwards at an optional offset, which can be negative.

* `length` - Getter that returns the number of logical characters within the string object.

* `match(String matcher)` - Matches a string or an object that supports being matched against, and returns an array containing the results of that search, or null if no matches are found.

* `padEnd(Integer targetLength, [String padString])` - Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied at the end of the string.

* `padStart(Integer targetLength, [String padString])` - Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied at the start of the string.

* `repeat(Integer count)` - Returns a new string which contains the specified number of copies of the string on which it was called.

* `replace(String pattern, String replacement)` - Creates a new UTF-safe string object with one, some, or all matches of a pattern replaced by a replacement.

* `slice(Integer start, Integer finish)` - Returns the characters between the two given indices in the string.

* `split(String seperator, Integer limit)` - Splits a string into substrings using the specified separator and return them as an array.

* `startsWith(String str, [Integer startPos])` - Determines whether the string starts with the characters of a specified search string.

* `substr(Integer start, Integer length)` - Returns the characters starting at the given start index up to the start index plus the given length.

* `substring(Integer start, [Integer end])` - Returns the characters starting at the given start index up to the end index.

* `toBytes()` - Converts the string into an array of UTF-16 bytes.

* `toCharArray()` - Converts the string into an array of individual logical characters.

* `toCodePoints()` - Converts the string into an array of codepoints.

* `toLowerCase()` - Returns a new string in which all the alphabetic characters are converted to lower case, without modifying the original string.

* `toString()` - Returns the original (unsafe) string the object is hiding.

* `toUpperCase()` - Returns a new string in which all the alphabetic characters are converted to upper case, without modifying the original string.

* `trim()` - Removes whitespace from both ends of the string and returns a new string, without modifying the original string.

* `trimEnd()` - Removes whitespace from the end of the string and returns a new string, without modifying the original string.

* `trimLeft()` - Same as `trimStart`.

* `trimRight()` - Same as `trimEnd`.

* `trimStart()` - Removes whitespace from the beginning of the string and returns a new string, without modifying the original string.

Additionally the class offers static methods in case you want to keep working with strings directly:

* `bytesToString(Array arr)` - Converts an array of UTF-16 bytes into a string.

* `charAt(String str, Integer index)` - Returns the character at the given index.

* `charCodeAt(String str, Integer index)` - Returns the Unicode codepoint at the given index.

* `codePointsToString(Array arr)` - Converts an array of codepoints into a string.

* `findByteIndex(String str, Integer charIndex)` - Finds the byte index for the given character index.

* `findCharIndex(String str, Integer byteIndex)` - Finds the character index for the given byte index.

* `fromBytes(Array arr)` - Converts an array of UTF-16 bytes into a UTF-safe string object.

* `fromCharCode(Integer codepoint)` - Returns a UTF-safe string object for the given Unicode codepoint.

* `fromCodePoints(Array arr)` - Converts an array of codepoints into a UTF-safe string object.

* `indexOf(String str, String searchValue, [Integer start])` - Finds the first instance of the search value within the string. Starts at an optional offset.

* `join(Array arr, [String seperator])` - Concatenates the strings from the given array into a new UTF-safe string object.

* `lastIndexOf(Str string, String searchValue, [Integer start])` - Finds the last instance of the search value within the string. Starts searching backwards at an optional offset, which can be negative.

* `lengthOf(String str)` - Returns the number of logical characters in the given string.

* `padEnd(String str, Integer targetLength, [String padString])` - Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied at the end of the string.

* `padStart(String str, Integer targetLength, [String padString])` - Creates a new string by padding the string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied at the start of the string.

* `slice(String str, Integer start, Integer finish)` - Returns the characters between the two given indices.

* `stringFromCharCode(Integer codepoint)` - Returns the string for the given Unicode codepoint.

* `stringToBytes(String str)` - Converts a string into an array of UTF-16 bytes.

* `stringToCharArray(String str)` - Converts the given string into an array of individual logical characters. Note that each entry in the returned array may be more than one UTF-16 character.

* `stringToCodePoints(String str)` - Converts a string into an array of codepoints.

* `substr(String str, Integer start, Integer length)` - Returns the characters starting at the given start index up to the start index plus the given length.

* `substring(String str, Integer start, [Integer end])` - Returns the characters starting at the given start index up to the end index.

## Regional Indicators

Certain characters in the Unicode standard are meant to be combined by display systems, but are represented by multiple code points. A good example are the so-called regional indicators. By themselves, regional indicators u1F1EB (regional indicator symbol letter F) and u1F1F7 (regional indicator symbol letter R) don't mean much, but combined they form the French flag: 🇫🇷.

Since regional indicators are semantically individual Unicode code points and because utfstring is a dependency of other Unicode-aware libraries, it doesn't make sense for utfstring to treat two regional indicators as a single character by default. That said, it can be useful to treat them as such from a display or layout perspective. In order to support both scenarios, two implementations are necessary. The first and default implementation is available via the instructions above. For visual grapheme clustering such as the grouping of regional indicators, use the class `UtfVisualString`. Display-aware versions of all the functions described above are available. The difference can be seen by way of the `lengthOf` function:

```javascript
UtfVisualString.length("🇫🇷");  // 1
UtfString.length("🇫🇷");        // 2
```

## Running Tests

Unit tests are written in Mocha and can be executed via:

1. `npm install`
2. `npm test`

## Authors

Written and maintained by Cameron C. Dutro ([@camertron](https://github.com/camertron)) and [contributors](https://github.com/camertron/utfstring/graphs/contributors).

## License

Copyright 2016 Cameron Dutro, licensed under the MIT license.
