# 3.0.0
## BREAKING CHANGES
* UtfString.visual has been moved to a separate class called UtfVisualString.
* Changed interface of substring method to use an end index parameter instead of a length parameter to match the interface of the String.substring method.
* UtfString.length is now called UtfString.lengthOf.
* UtfString.fromCharCode is now called UtfString.stringFromCharCode.

## Changes
* UtfString is now a class that can be instantiated and has its own set of string methods.
* UtfVisualString is now a class that can be instantiated and has its own set of string methods.

## Added
* New method UtfString.fromBytes: Converts an array of UTF-16 bytes into a UTF-safe string object.
* New method UtfString.fromCharCode: Returns a UTF-safe string object for the given Unicode codepoint.
* New method UtfString.fromCodePoints: Converts an array of codepoints into a UTF-safe string object.
* New method UtfString.join: Concatenates the strings from the given array into a new string object.
* New method UtfString.padEnd: Creates a new string by padding the string at the end with a given string.
* New method UtfString.padStart: Creates a new string by padding the string at the beginning with a given string.

# 2.1.0
* Port code to TypeScript and add comments (#8, @krisztianb).

# 2.0.2
* Add missing `var` in front of local variable (#7, @SStauden).

# 2.0.1
* Fix bug causing utfstring to incorrectly calculate logical character indices.
  - For example, `utfstring.charCodeAt("\u0001\u1F1E6", 1)` returned 56806 when it should have returned 127462.

# 2.0.0
* Abstract grapheme cluster identification in order to separate visual graphemes from individual code points.
  - The classic example if this is regional indicators, which are separate code points but combined by display systems into one visible character. Automatically treating them as a single character can be confusing when using utfstring in other Unicode-aware libraries. Since a number of other programming languages (eg. Ruby, Elixir) don't combine regional indicators when determining length, substrings, etc, I've decided to move regional indicator combination support from the existing utfstring functions to a separate implementation available in `UtfString.visual`, which supports regional indicators but otherwise behaves identically.

# 1.3.1
* Fix bug causing incorrect character index calculations for strings containing newlines.

# 1.3.0
* Added `findByteIndex` and `findCharIndex` functions for converting between JavaScript string indices and UTF character boundaries.

# 1.2.0
* Changed module behavior such that `var UtfString = require('utfstring')` works instead of having to do `var UtfString = require('utfstring/utfstring.js').UtfString`.
