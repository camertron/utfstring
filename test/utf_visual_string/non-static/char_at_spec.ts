import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#charAt", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfVisualString("abc");
            expect(utfString.charAt(0)).toEqual("a");
            expect(utfString.charAt(1)).toEqual("b");
            expect(utfString.charAt(2)).toEqual("c");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfVisualString("ありがとう"); // "arigatou"
            expect(utfString.charAt(0)).toEqual("あ"); // "a"
            expect(utfString.charAt(1)).toEqual("り"); // "ri"
            expect(utfString.charAt(2)).toEqual("が"); // "ga"
            expect(utfString.charAt(3)).toEqual("と"); // "to"
            expect(utfString.charAt(4)).toEqual("う"); // "u"
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfVisualString("𤔣𤔤𤔥𤔦");
            expect(utfString.charAt(0)).toEqual("𤔣");
            expect(utfString.charAt(1)).toEqual("𤔤");
            expect(utfString.charAt(2)).toEqual("𤔥");
            expect(utfString.charAt(3)).toEqual("𤔦");
        });

        it("returns an empty string for indices that are out of range", () => {
            const utfString = new UtfVisualString("abc");
            expect(utfString.charAt(3)).toEqual("");
        });

        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expect(utfString.charAt(0)).toEqual("🇸🇴");
            expect(utfString.charAt(1)).toEqual("🇫🇷");
        });
    });
});

