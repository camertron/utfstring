import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#findByteIndex (static)", () => {
        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            expect(UtfVisualString.findByteIndex(str, 0)).toEqual(0);
            expect(UtfVisualString.findByteIndex(str, 1)).toEqual(4);
            expect(UtfVisualString.findByteIndex(str, 2)).toEqual(-1);
        });
    });
});

