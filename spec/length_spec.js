var UtfString = require('../utfstring.js').UtfString;

describe('UtfString', function() {
  describe('#length', function() {
    it('counts the number of characters in an ASCII string', function() {
      var str = 'abc';
      expect(str.length).toEqual(3);
      expect(UtfString.length(str)).toEqual(3);
    });

    it('counts the number of characters in a multi-byte string', function() {
      var str = 'ありがとう';
      expect(str.length).toEqual(5);
      expect(UtfString.length(str)).toEqual(5);
    });

    it('counts the number of astral plane unicode characters', function() {
      var str = '𤔣';
      expect(str.length).toEqual(2);
      expect(UtfString.length(str)).toEqual(1);
    });

    it('counts the number of astral plane unicode characters', function() {
      var str = '𤔣𤔤𤔥𤔦';
      expect(str.length).toEqual(8);
      expect(UtfString.length(str)).toEqual(4);
    });

    it('counts the number of characters in a mixed string', function() {
      var str = 'あaりbがc𤔣dとeうf'
      expect(UtfString.length(str)).toEqual(12);
    });

    it('returns zero when the string is empty', function() {
      expect(UtfString.length('')).toEqual(0);
    });
  });
});
