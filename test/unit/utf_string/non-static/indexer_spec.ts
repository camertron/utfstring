import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("[indexer]", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString[0]).toBeInstanceOf(UtfString);
        });

        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString[0].toString()).toEqual("a");
            expect(utfString[1].toString()).toEqual("b");
            expect(utfString[2].toString()).toEqual("c");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう"); // "arigatou"
            expect(utfString[0].toString()).toEqual("あ"); // "a"
            expect(utfString[1].toString()).toEqual("り"); // "ri"
            expect(utfString[2].toString()).toEqual("が"); // "ga"
            expect(utfString[3].toString()).toEqual("と"); // "to"
            expect(utfString[4].toString()).toEqual("う"); // "u"
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString[0].toString()).toEqual("𤔣");
            expect(utfString[1].toString()).toEqual("𤔤");
            expect(utfString[2].toString()).toEqual("𤔥");
            expect(utfString[3].toString()).toEqual("𤔦");
        });

        it("returns an empty string for indices that are out of range", () => {
            const utfString = new UtfString("abc");
            expect(utfString[3].toString()).toEqual("");
        });

        it("doesn't pair regional indicators", () => {
            const utfString = new UtfString("🇸🇴🇫🇷");
            expect(utfString[0].toString()).toEqual("🇸");
            expect(utfString[1].toString()).toEqual("🇴");
            expect(utfString[2].toString()).toEqual("🇫");
            expect(utfString[3].toString()).toEqual("🇷");
        });
    });
});
