import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#findCharIndex (static)", () => {
        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            expect(UtfVisualString.findCharIndex(str, 0)).toEqual(0);
            expect(UtfVisualString.findCharIndex(str, 1)).toEqual(0);
            expect(UtfVisualString.findCharIndex(str, 2)).toEqual(0);
            expect(UtfVisualString.findCharIndex(str, 3)).toEqual(0);
            expect(UtfVisualString.findCharIndex(str, 4)).toEqual(1);
            expect(UtfVisualString.findCharIndex(str, 5)).toEqual(1);
            expect(UtfVisualString.findCharIndex(str, 6)).toEqual(1);
            expect(UtfVisualString.findCharIndex(str, 7)).toEqual(1);
            expect(UtfVisualString.findCharIndex(str, 8)).toEqual(-1);
        });
    });
});
