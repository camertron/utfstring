import expect from "expect";
import { UtfVisualString } from "../../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("[indexer]", () => {
        it("returns an object of type UtfVisualString", () => {
            const utfString = new UtfVisualString("abc");
            expect(utfString[0]).toBeInstanceOf(UtfVisualString);
        });

        it("works with standard ASCII characters", () => {
            const utfString = new UtfVisualString("abc");
            expect(utfString[0].toString()).toEqual("a");
            expect(utfString[1].toString()).toEqual("b");
            expect(utfString[2].toString()).toEqual("c");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfVisualString("ありがとう"); // "arigatou"
            expect(utfString[0].toString()).toEqual("あ"); // "a"
            expect(utfString[1].toString()).toEqual("り"); // "ri"
            expect(utfString[2].toString()).toEqual("が"); // "ga"
            expect(utfString[3].toString()).toEqual("と"); // "to"
            expect(utfString[4].toString()).toEqual("う"); // "u"
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfVisualString("𤔣𤔤𤔥𤔦");
            expect(utfString[0].toString()).toEqual("𤔣");
            expect(utfString[1].toString()).toEqual("𤔤");
            expect(utfString[2].toString()).toEqual("𤔥");
            expect(utfString[3].toString()).toEqual("𤔦");
        });

        it("returns an empty string for indices that are out of range", () => {
            const utfString = new UtfVisualString("abc");
            expect(utfString[3].toString()).toEqual("");
        });

        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expect(utfString[0].toString()).toEqual("🇸🇴");
            expect(utfString[1].toString()).toEqual("🇫🇷");
        });
    });
});
