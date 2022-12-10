import expect from "expect";
import { UtfVisualString } from "../../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#findCharIndex", () => {
        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expect(utfString.findCharIndex(0)).toEqual(0);
            expect(utfString.findCharIndex(1)).toEqual(0);
            expect(utfString.findCharIndex(2)).toEqual(0);
            expect(utfString.findCharIndex(3)).toEqual(0);
            expect(utfString.findCharIndex(4)).toEqual(1);
            expect(utfString.findCharIndex(5)).toEqual(1);
            expect(utfString.findCharIndex(6)).toEqual(1);
            expect(utfString.findCharIndex(7)).toEqual(1);
            expect(utfString.findCharIndex(8)).toEqual(-1);
        });
    });
});
