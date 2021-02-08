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
