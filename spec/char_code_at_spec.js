var UtfString = require('../utfstring.js');

describe('UtfString', function() {
  describe('#charCodeAt', function() {
    it('works with standard ASCII characters', function() {
      var str = 'abc';
      expect(UtfString.charCodeAt(str, 0)).toEqual(97);
      expect(UtfString.charCodeAt(str, 1)).toEqual(98);
      expect(UtfString.charCodeAt(str, 2)).toEqual(99);
      expect(UtfString.charCodeAt(str, 3)).toBeNaN();
    });

    it('works with multi-byte characters', function() {
      var str = 'ありがとう';  // "arigatou"
      expect(UtfString.charCodeAt(str, 0)).toEqual(12354);  // あ "a"
      expect(UtfString.charCodeAt(str, 1)).toEqual(12426);  // り "ri"
      expect(UtfString.charCodeAt(str, 2)).toEqual(12364);  // が "ga"
      expect(UtfString.charCodeAt(str, 3)).toEqual(12392);  // と "to"
      expect(UtfString.charCodeAt(str, 4)).toEqual(12358);  // う "u"
      expect(UtfString.charCodeAt(str, 5)).toBeNaN();
    });

    it('works with astral plane unicode characters', function() {
      var str = "\u{24523}";
      expect(UtfString.charCodeAt(str, 0)).toEqual(148771);
      expect(UtfString.charCodeAt(str, 1)).toBeNaN();
    });

    it('works with mixed astral and non-astral plane characters', function() {
      var str = "\u0001\u{1F1E6}\u0002";
      expect(UtfString.charCodeAt(str, 0)).toEqual(1);
      expect(UtfString.charCodeAt(str, 1)).toEqual(127462);
      expect(UtfString.charCodeAt(str, 2)).toEqual(2);
      expect(UtfString.charCodeAt(str, 3)).toBeNaN();
    });

    it('works with regional indicators', function() {
      var str = '🇫🇷';
      expect(UtfString.charCodeAt(str, 0)).toEqual(127467);
      expect(UtfString.charCodeAt(str, 1)).toEqual(127479);
    });
  });
});
