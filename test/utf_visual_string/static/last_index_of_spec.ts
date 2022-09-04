import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#lastIndexOf (static)", () => {
        it("works with regional indicators", () => {
            const str = "🇫🇷🇸🇴🇫🇷";
            expect(UtfVisualString.lastIndexOf(str, "🇫🇷")).toEqual(2);
            expect(UtfVisualString.lastIndexOf(str, "🇫")).toEqual(2);
            expect(UtfVisualString.lastIndexOf(str, "🇷")).toEqual(2);
            expect(UtfVisualString.lastIndexOf(str, "🇸🇴")).toEqual(1);
        });
    });
});

