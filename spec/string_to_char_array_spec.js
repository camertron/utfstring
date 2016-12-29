var UtfString = require('../utfstring.js');

describe('UtfString', function() {
  describe('#stringToCharArray', function() {
    it('works with standard ASCII characters', function() {
      var str = 'abc';
      expect(UtfString.stringToCharArray(str)).toEqual(['a', 'b', 'c']);
    });

    it('works with multi-byte characters', function() {
      var str = 'ありがとう';
      expect(UtfString.stringToCharArray(str)).toEqual(
        ['あ', 'り', 'が', 'と', 'う']
      );
    });

    it('works with unicode astral plane characters', function() {
      var str = '𤔣𤔤𤔥𤔦';
      expect(UtfString.stringToCharArray(str)).toEqual(
        ['𤔣', '𤔤', '𤔥', '𤔦']
      );
    });

    it('works with regional indicators', function() {
      var str = '🇸🇴🇫🇷';
      expect(UtfString.stringToCharArray(str)).toEqual(['🇸🇴', '🇫🇷']);
    });
  });
});
