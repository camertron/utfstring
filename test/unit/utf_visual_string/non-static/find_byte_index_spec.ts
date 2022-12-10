import expect from "expect";
import { UtfVisualString } from "../../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#findByteIndex", () => {
        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expect(utfString.findByteIndex(0)).toEqual(0);
            expect(utfString.findByteIndex(1)).toEqual(4);
            expect(utfString.findByteIndex(2)).toEqual(-1);
        });
    });
});
