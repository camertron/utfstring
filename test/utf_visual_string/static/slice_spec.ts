import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#slice (static)", () => {
        describe("with regional indicators", () => {
            const str = "🇸🇴🇫🇷";

            it("works when given start and end indices", () => {
                expect(UtfVisualString.slice(str, 0, 1)).toEqual("🇸🇴");
                expect(UtfVisualString.slice(str, 1, 2)).toEqual("🇫🇷");
            });

            it("works when not given an end index", () => {
                expect(UtfVisualString.slice(str, 0)).toEqual("🇸🇴🇫🇷");
                expect(UtfVisualString.slice(str, 1)).toEqual("🇫🇷");
            });

            it("returns an empty string when given out-of-bounds indices", () => {
                expect(UtfVisualString.slice(str, 4)).toEqual("");
                expect(UtfVisualString.slice(str, 4, 5)).toEqual("");
            });
        });
    });
});
