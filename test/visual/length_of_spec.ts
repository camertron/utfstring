import expect from "expect";
import { UtfVisualString } from "../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#length", () => {
        it("correctly counts single regional indicator characters", () => {
            const str = "🇸";
            expect(str.length).toEqual(2);
            expect(UtfVisualString.lengthOf(str)).toEqual(1);
        });

        it("correctly counts pairs of regional indicator characters", () => {
            const str = "🇸🇴";
            expect(str.length).toEqual(4);
            expect(UtfVisualString.lengthOf(str)).toEqual(1);
        });

        it("correctly counts multiple pairs of regional indicator characters", () => {
            const str = "🇸🇴🇫🇷";
            expect(str.length).toEqual(8);
            expect(UtfVisualString.lengthOf(str)).toEqual(2);
        });
    });
});

