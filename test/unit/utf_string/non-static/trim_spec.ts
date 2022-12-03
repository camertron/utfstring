import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#trim", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString(" abc ");
            expect(utfString.trim()).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString(" abc ");
            expect(utfString.trim() === utfString).toBeFalsy();
        });

        it("trims spaces on both ends", () => {
            const utfString = new UtfString(" abc ");
            expect(utfString.trim().toString()).toEqual("abc");
        });

        it("trims new line characters on both ends", () => {
            const utfString = new UtfString("\nabc\n");
            expect(utfString.trim().toString()).toEqual("abc");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString(" ありがとう "); // "arigatou"
            expect(utfString.trim().toString()).toEqual("ありがとう");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString(" 𤔣𤔤𤔥𤔦 ");
            expect(utfString.trim().toString()).toEqual("𤔣𤔤𤔥𤔦");
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString(" 🇸🇴🇫🇷 ");
            expect(utfString.trim().toString()).toEqual("🇸🇴🇫🇷");
        });
    });
});
