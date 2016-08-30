var UtfString = require('../utfstring.js').UtfString;

describe('UtfString', function() {
  describe('#fromCharCode', function() {
    it('works with standard ASCII characters', function() {
      expect(UtfString.fromCharCode(97)).toEqual('a');
      expect(UtfString.fromCharCode(98)).toEqual('b');
      expect(UtfString.fromCharCode(99)).toEqual('c');
    });

    it('works with multi-byte characters', function() {
      expect(UtfString.fromCharCode(12354)).toEqual('あ');
      expect(UtfString.fromCharCode(12426)).toEqual('り');
      expect(UtfString.fromCharCode(12364)).toEqual('が');
      expect(UtfString.fromCharCode(12392)).toEqual('と');
      expect(UtfString.fromCharCode(12358)).toEqual('う');
    });

    it('works with astral plane unicode characters', function() {
      expect(UtfString.fromCharCode(148771)).toEqual('𤔣');
    });
  });
});
