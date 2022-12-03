import expect from "expect";
import { UtfVisualString } from "../../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#indexOf (static)", () => {
        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            expect(UtfVisualString.indexOf(str, "🇸🇴")).toEqual(0);
            expect(UtfVisualString.indexOf(str, "🇫🇷")).toEqual(1);
            expect(UtfVisualString.indexOf(str, "🇸")).toEqual(0);
            expect(UtfVisualString.indexOf(str, "🇴")).toEqual(0);
            expect(UtfVisualString.indexOf(str, "🇫")).toEqual(1);
            expect(UtfVisualString.indexOf(str, "🇷")).toEqual(1);
        });
    });
});
