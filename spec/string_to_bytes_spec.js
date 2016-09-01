var UtfString = require('../utfstring.js').UtfString;

describe('UtfString', function() {
  describe('#stringToBytes', function() {
    it('works with standard ASCII characters', function() {
      var str = 'abc';
      expect(UtfString.stringToBytes(str)).toEqual(
        [0, 97, 0, 98, 0, 99]
      );
    });

    it('works with multi-byte characters', function() {
      var str = 'ありがとう';
      expect(UtfString.stringToBytes(str)).toEqual(
        [48, 66, 48, 138, 48, 76, 48, 104, 48, 70]
      );
    });

    it('works when given start and end indices', function() {
      var str = '𤔣𤔤𤔥𤔦';
      expect(UtfString.stringToBytes(str)).toEqual(
        [216, 81, 221, 35, 216, 81, 221, 36, 216, 81, 221, 37, 216, 81, 221, 38]
      );
    });
  });
});
