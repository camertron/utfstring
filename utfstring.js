(function() {
  var UtfString;

  if (typeof exports !== 'undefined' && exports !== null) {
    UtfString = exports;
  } else if (typeof window !== 'undefined' && window !== null) {
    if ((typeof window.UtfString === 'undefined') || (window.UtfString === null)) {
      window.UtfString = {};
    }

    UtfString = window.UtfString;
  }

  UtfString.findCharIndex = function(string, byteIndex) {
    if (byteIndex >= string.length) {
      return -1;
    }

    // optimization: don't iterate unless necessary
    if (!containsUnsupportedCharacters(string)) {
      return byteIndex;
    }

    var regStr = unsupportedPairs.source + '|[^]';
    var scanner = new RegExp(regStr, 'g');
    var charCount = 0;

    while (scanner.exec(string) !== null) {
      if (scanner.lastIndex > byteIndex) {
        break;
      }

      charCount ++;
    }

    return charCount;
  };

  UtfString.findByteIndex = function(string, charIndex) {
    if (charIndex >= this.length(string)) {
      return -1;
    }

    return scan(string, createScanner(), charIndex);
  };

  UtfString.charAt = function(string, index) {
    var byteIndex = this.findByteIndex(string, index);

    if ((byteIndex < 0) || (byteIndex >= string.length)) {
      return '';
    }

    var characters = string.slice(byteIndex, byteIndex + 8);
    var match = unsupportedPairs.exec(characters);

    if (match === null) {
      return characters[0];
    } else {
      return match[0];
    }
  };

  UtfString.charCodeAt = function(string, index) {
    var byteIndex = findSurrogateByteIndex(string, index);

    if (byteIndex < 0) {
      return NaN;
    }

    var code = string.charCodeAt(byteIndex);

    if ((0xD800 <= code) && (code <= 0xDBFF)) {
      var hi = code;
      var low = string.charCodeAt(byteIndex + 1);
      return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }

    return code;
  };

  UtfString.fromCharCode = function(charCode) {
    if (charCode > 0xFFFF) {
      charCode -= 0x10000;

      return String.fromCharCode(
        0xD800 + (charCode >> 10), 0xDC00 + (charCode & 0x3FF)
      );
    } else {
      return String.fromCharCode(charCode);
    }
  };

  UtfString.indexOf = function(string, searchValue, start) {
    if ((typeof start === 'undefined') || (start === null)) {
      start = 0;
    }

    var startByteIndex = this.findByteIndex(string, start);
    var index = string.indexOf(searchValue, startByteIndex);

    if (index < 0) {
      return -1
    } else {
      return this.findCharIndex(string, index);
    }
  };

  UtfString.lastIndexOf = function(string, searchValue, start) {
    var index;

    if ((typeof start === 'undefined') || (start === null)) {
      index = string.lastIndexOf(searchValue);
    } else {
      var startByteIndex = this.findByteIndex(string, start);
      index = string.lastIndexOf(searchValue, startByteIndex);
    }

    if (index < 0) {
      return -1;
    } else {
      return this.findCharIndex(string, index);
    }
  };

  UtfString.slice = function(string, start, finish) {
    var startByteIndex = this.findByteIndex(string, start);
    var finishByteIndex;

    if (startByteIndex < 0) {
      startByteIndex = string.length;
    }

    if ((typeof finish === 'undefined') || (finish === null)) {
      finishByteIndex = string.length;
    } else {
      finishByteIndex = this.findByteIndex(string, finish);

      if (finishByteIndex < 0) {
        finishByteIndex = string.length;
      }
    }

    return string.slice(startByteIndex, finishByteIndex);
  };

  UtfString.substr = function(string, start, length) {
    if (start < 0) {
      start = this.length(string) + start;
    }

    if ((typeof length === 'undefined') || (length === null)) {
      return this.slice(string, start);
    } else {
      return this.slice(string, start, start + length);
    }
  };

  // they do the same thing
  UtfString.substring = UtfString.slice;

  UtfString.length = function(string) {
    // findCharIndex will return -1 if string is empty, so add 1
    return this.findCharIndex(string, string.length - 1) + 1;
  };

  UtfString.stringToCodePoints = function(string) {
    var result = [];

    for (var i = 0; i < string.length; i ++) {
      codePoint = this.charCodeAt(string, i);

      if (!codePoint) {
        break;
      }

      result.push(codePoint);
    }

    return result;
  };

  UtfString.codePointsToString = function(arr) {
    var chars = [];

    for (var i = 0; i < arr.length; i ++) {
      chars.push(this.fromCharCode(arr[i]));
    }

    return chars.join('');
  };

  UtfString.stringToBytes = function(string) {
    var result = [];

    for (var i = 0; i < string.length; i ++) {
      var chr = string.charCodeAt(i);
      var byteArray = [];

      while (chr > 0) {
        byteArray.push(chr & 0xFF);
        chr >>= 8;
      }

      // all utf-16 characters are two bytes
      if (byteArray.length == 1) {
        byteArray.push(0);
      }

      // assume big-endian
      result = result.concat(byteArray.reverse());
    }

    return result;
  };

  UtfString.bytesToString = function(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i += 2) {
      var hi = arr[i];
      var low = arr[i + 1];
      var combined = (hi << 8) | low;
      result.push(String.fromCharCode(combined));
    }

    return result.join('');
  };

  UtfString.stringToCharArray = function(string) {
    var result = [];
    var regStr = unsupportedPairs.source + '|.';
    var scanner = new RegExp(regStr, 'g');

    do {
      var match = scanner.exec(string);

      if (match === null) {
        break;
      }

      result.push(match[0]);
    } while(match !== null);

    return result;
  };

  function findSurrogateByteIndex(string, charIndex) {
    return scan(string, new RegExp(surrogatePairs.source, 'g'), charIndex);
  }

  function scan(string, scanner, charIndex) {
    // optimization: don't iterate unless it's necessary
    if (!containsUnsupportedCharacters(string)) {
      return charIndex;
    }

    var byteIndex = 0;
    var charCount = 0;

    do {
      var match = scanner.exec(string);

      if (match === null) {
        break;
      }

      if (charCount < charIndex) {
        byteIndex += match[0].length;
        charCount ++;
      } else {
        break;
      }
    } while (match !== null);

    if (byteIndex >= string.length) {
      return -1;
    }

    return byteIndex;
  }

  function containsUnsupportedCharacters(string) {
    return unsupportedPairs.test(string);
  }

  function createScanner(modifiers) {
    if ((typeof modifiers === 'undefined') || (modifiers === null)) {
      modifiers = '';
    }

    var regStr = [regionalIndicatorPairs.source, surrogatePairs.source].join('|');
    return new RegExp(regStr, modifiers);
  }

  // "unsupported" means "handled incorrectly by javascript"
  var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
  var regionalIndicatorPairs = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;
  var unsupportedPairs = createScanner();
})();
