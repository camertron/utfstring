var UtfString = require('../utfstring.js');

describe('UtfString', function() {
  describe('#findByteIndex', function() {
    it('works with standard ASCII characters', function() {
      var str = 'abc';
      expect(UtfString.findByteIndex(str, 0)).toEqual(0);
      expect(UtfString.findByteIndex(str, 1)).toEqual(1);
      expect(UtfString.findByteIndex(str, 2)).toEqual(2);
      expect(UtfString.findByteIndex(str, 3)).toEqual(-1);
    });

    it('works with multi-byte characters', function() {
      var str = 'ありがとう';
      expect(UtfString.findByteIndex(str, 0)).toEqual(0);
      expect(UtfString.findByteIndex(str, 1)).toEqual(1);
      expect(UtfString.findByteIndex(str, 2)).toEqual(2);
      expect(UtfString.findByteIndex(str, 3)).toEqual(3);
      expect(UtfString.findByteIndex(str, 4)).toEqual(4);
      expect(UtfString.findByteIndex(str, 5)).toEqual(-1);
    });

    it('works with astral plane unicode characters', function() {
      var str = '𤔣𤔤𤔥𤔦';
      expect(UtfString.findByteIndex(str, 0)).toEqual(0);
      expect(UtfString.findByteIndex(str, 1)).toEqual(2);
      expect(UtfString.findByteIndex(str, 2)).toEqual(4);
      expect(UtfString.findByteIndex(str, 3)).toEqual(6);
      expect(UtfString.findByteIndex(str, 4)).toEqual(-1);
    });

    it('works with regional indicators', function() {
      var str = '🇸🇴🇫🇷';
      expect(UtfString.findByteIndex(str, 0)).toEqual(0);
      expect(UtfString.findByteIndex(str, 1)).toEqual(4);
      expect(UtfString.findByteIndex(str, 2)).toEqual(-1);
    });
  });
});
