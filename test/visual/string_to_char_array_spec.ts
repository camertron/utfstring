import expect from "expect";
import { UtfVisualString } from "../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#stringToCharArray", () => {
        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            expect(UtfVisualString.stringToCharArray(str)).toEqual(["🇸🇴", "🇫🇷"]);
        });
    });
});

