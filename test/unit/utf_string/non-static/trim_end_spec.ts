import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#trimEnd", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc ");
            expect(utfString.trimEnd()).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc ");
            expect(utfString.trimEnd() === utfString).toBeFalsy();
        });

        it("trims spaces only at the end", () => {
            const utfString = new UtfString(" abc ");
            expect(utfString.trimEnd().toString()).toEqual(" abc");
        });

        it("trims new line characters only at the end", () => {
            const utfString = new UtfString("\nabc\n");
            expect(utfString.trimEnd().toString()).toEqual("\nabc");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString(" ありがとう "); // "arigatou"
            expect(utfString.trimEnd().toString()).toEqual(" ありがとう");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString(" 𤔣𤔤𤔥𤔦 ");
            expect(utfString.trimEnd().toString()).toEqual(" 𤔣𤔤𤔥𤔦");
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString(" 🇸🇴🇫🇷 ");
            expect(utfString.trimEnd().toString()).toEqual(" 🇸🇴🇫🇷");
        });
    });
});
