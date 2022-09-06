import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#toString", () => {
        it("works with an empty string", () => {
            const str = "";
            const utfString = new UtfString(str);
            expect(utfString.toString()).toEqual(str);
        });

        it("works with standard ASCII characters", () => {
            const str = "abc";
            const utfString = new UtfString(str);
            expect(utfString.toString()).toEqual(str);
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう"; // "arigatou"
            const utfString = new UtfString(str);
            expect(utfString.toString()).toEqual(str);
        });

        it("works with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            const utfString = new UtfString(str);
            expect(utfString.toString()).toEqual(str);
        });

        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            const utfString = new UtfString(str);
            expect(utfString.toString()).toEqual(str);
        });
    });
});

