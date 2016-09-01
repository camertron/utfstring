(function() {
  var UtfString = {
    charAt: function(string, index) {
      var byteIndex = this._findByteIndex(string, index);

      if ((byteIndex < 0) || (byteIndex >= string.length)) {
        return '';
      }

      var code = string.charCodeAt(byteIndex);

      if ((0xD800 <= code) && (code <= 0xDBFF)) {
        return string.slice(byteIndex, byteIndex + 2);
      } else {
        return string[byteIndex];
      }
    },

    charCodeAt: function(string, index) {
      var byteIndex = this._findByteIndex(string, index);

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
    },

    fromCharCode: function(charCode) {
      if (charCode > 0xFFFF) {
        charCode -= 0x10000;

        return String.fromCharCode(
          0xD800 + (charCode >> 10), 0xDC00 + (charCode & 0x3FF)
        );
      } else {
        return String.fromCharCode(charCode);
      }
    },

    indexOf: function(string, searchValue, start) {
      if ((typeof start === 'undefined') || (start === null)) {
        start = 0;
      }

      var startByteIndex = this._findByteIndex(string, start);
      var index = string.indexOf(searchValue, startByteIndex);

      if (index < 0) {
        return -1
      } else {
        return this._findCharIndex(string, index);
      }
    },

    lastIndexOf: function(string, searchValue, start) {
      var index;

      if ((typeof start === 'undefined') || (start === null)) {
        index = string.lastIndexOf(searchValue);
      } else {
        var startByteIndex = this._findByteIndex(string, start);
        index = string.lastIndexOf(searchValue, startByteIndex);
      }

      if (index < 0) {
        return -1;
      } else {
        return this._findCharIndex(string, index);
      }
    },

    slice: function(string, start, finish) {
      var startByteIndex = this._findByteIndex(string, start);
      var finishByteIndex;

      if (startByteIndex < 0) {
        startByteIndex = string.length;
      }

      if ((typeof finish === 'undefined') || (finish === null)) {
        finishByteIndex = string.length;
      } else {
        finishByteIndex = this._findByteIndex(string, finish);

        if (finishByteIndex < 0) {
          finishByteIndex = string.length;
        }
      }

      return string.slice(startByteIndex, finishByteIndex);
    },

    substr: function(string, start, length) {
      if (start < 0) {
        start = this.length(string) + start;
      }

      if ((typeof length === 'undefined') || (length === null)) {
        return this.slice(string, start);
      } else {
        return this.slice(string, start, start + length);
      }
    },

    // they do the same thing
    substring: this.slice,

    length: function(string) {
      return this._findCharIndex(string, string.length);
    },

    stringToCodePoints: function(string) {
      var result = [];

      for (var i = 0; i < string.length; i ++) {
        codePoint = this.charCodeAt(string, i);

        if (!codePoint) {
          break;
        }

        result.push(codePoint);
      }

      return result;
    },

    codePointsToString: function(arr) {
      var chars = [];

      for (var i = 0; i < arr.length; i ++) {
        chars.push(this.fromCharCode(arr[i]));
      }

      return chars.join('');
    },

    stringToBytes: function(string) {
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
    },

    bytesToString: function(arr) {
      var result = [];

      for (var i = 0; i < arr.length; i += 2) {
        var hi = arr[i];
        var low = arr[i + 1];
        var combined = (hi << 8) | low;
        result.push(String.fromCharCode(combined));
      }

      return result.join('');
    },

    _findCharIndex: function(string, byteIndex) {
      // optimization: don't iterate unless necessary
      if (!this._containsSurrogatePair(string)) {
        return byteIndex;
      }

      var re = /[\uD800-\uDBFF][\uDC00-\uDFFF]|./g;
      var charCount = 0;

      while (re.exec(string) != null) {
        if (re.lastIndex > byteIndex) {
          break;
        }

        charCount ++;
      }

      return charCount;
    },

    _findByteIndex: function(string, charIndex) {
      // optimization: don't iterate unless it's necessary
      if (!this._containsSurrogatePair(string)) {
        return charIndex;
      }

      var length = string.length;
      var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

      while (surrogatePairs.exec(string) != null) {
        var li = surrogatePairs.lastIndex;

        if (li - 2 < charIndex) {
          charIndex ++;
        } else {
          break;
        }
      }

      if ((charIndex >= length) || (charIndex < 0)) {
        return -1;
      }

      return charIndex;
    },

    _containsSurrogatePair: function(string) {
      var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
      return surrogatePairs.test(string);
    }
  };

  var root;

  if (typeof exports !== 'undefined' && exports !== null) {
    root = exports;
  } else if (typeof window !== 'undefined' && window !== null) {
    root = window;
  }

  root.UtfString = UtfString;
})();
