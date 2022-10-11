import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#trimStart", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString(" abc");
            expect(utfString.trimStart()).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString(" abc");
            expect(utfString.trimStart() === utfString).toBeFalsy();
        });

        it("trims spaces only at the beginning", () => {
            const utfString = new UtfString(" abc ");
            expect(utfString.trimStart().toString()).toEqual("abc ");
        });

        it("trims new line characters only at the beginning", () => {
            const utfString = new UtfString("\nabc\n");
            expect(utfString.trimStart().toString()).toEqual("abc\n");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString(" ありがとう "); // "arigatou"
            expect(utfString.trimStart().toString()).toEqual("ありがとう ");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString(" 𤔣𤔤𤔥𤔦 ");
            expect(utfString.trimStart().toString()).toEqual("𤔣𤔤𤔥𤔦 ");
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString(" 🇸🇴🇫🇷 ");
            expect(utfString.trimStart().toString()).toEqual("🇸🇴🇫🇷 ");
        });
    });
});
