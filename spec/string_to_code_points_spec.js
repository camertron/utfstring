var UtfString = require('../utfstring.js').UtfString;

describe('UtfString', function() {
  describe('#stringToCodePoints', function() {
    it('works with standard ASCII characters', function() {
      var str = 'abc';
      expect(UtfString.stringToCodePoints(str)).toEqual([97, 98, 99]);
    });

    it('works with multi-byte characters', function() {
      var str = 'ありがとう';
      expect(UtfString.stringToCodePoints(str)).toEqual(
        [12354, 12426, 12364, 12392, 12358]
      )
    });

    it('works when given start and end indices', function() {
      var str = '𤔣𤔤𤔥𤔦';
      expect(UtfString.stringToCodePoints(str)).toEqual(
        [148771, 148772, 148773, 148774]
      )
    });
  });
});
