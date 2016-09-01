var UtfString = require('../utfstring.js').UtfString;

describe('UtfString', function() {
  describe('#codePointsToString', function() {
    it('works with standard ASCII characters', function() {
      var arr = [97, 98, 99];
      expect(UtfString.codePointsToString(arr)).toEqual('abc');
    });

    it('works with multi-byte characters', function() {
      var arr = [12354, 12426, 12364, 12392, 12358];
      expect(UtfString.codePointsToString(arr)).toEqual('ありがとう')
    });

    it('works when given start and end indices', function() {
      var arr = [148771, 148772, 148773, 148774];
      expect(UtfString.codePointsToString(arr)).toEqual('𤔣𤔤𤔥𤔦')
    });
  });
});
