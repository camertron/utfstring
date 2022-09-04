import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#charAt (static)", () => {
        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            expect(UtfVisualString.charAt(str, 0)).toEqual("🇸🇴");
            expect(UtfVisualString.charAt(str, 1)).toEqual("🇫🇷");
        });
    });
});

