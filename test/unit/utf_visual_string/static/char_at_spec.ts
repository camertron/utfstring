import expect from "expect";
import { UtfVisualString } from "../../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#charAt (static)", () => {
        it("works with standard ASCII characters", () => {
            const str = "abc";
            expect(UtfVisualString.charAt(str, 0)).toEqual("a");
            expect(UtfVisualString.charAt(str, 1)).toEqual("b");
            expect(UtfVisualString.charAt(str, 2)).toEqual("c");
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう"; // "arigatou"
            expect(UtfVisualString.charAt(str, 0)).toEqual("あ"); // "a"
            expect(UtfVisualString.charAt(str, 1)).toEqual("り"); // "ri"
            expect(UtfVisualString.charAt(str, 2)).toEqual("が"); // "ga"
            expect(UtfVisualString.charAt(str, 3)).toEqual("と"); // "to"
            expect(UtfVisualString.charAt(str, 4)).toEqual("う"); // "u"
        });

        it("works with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            expect(UtfVisualString.charAt(str, 0)).toEqual("𤔣");
            expect(UtfVisualString.charAt(str, 1)).toEqual("𤔤");
            expect(UtfVisualString.charAt(str, 2)).toEqual("𤔥");
            expect(UtfVisualString.charAt(str, 3)).toEqual("𤔦");
        });

        it("returns an empty string for indices that are out of range", () => {
            const str = "abc";
            expect(UtfVisualString.charAt(str, 3)).toEqual("");
        });

        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            expect(UtfVisualString.charAt(str, 0)).toEqual("🇸🇴");
            expect(UtfVisualString.charAt(str, 1)).toEqual("🇫🇷");
        });
    });
});
