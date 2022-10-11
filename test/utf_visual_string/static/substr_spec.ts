import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#substr (static)", () => {
        describe("with regional indicators", () => {
            const str = "🇸🇴🇫🇷";

            it("works when given a start and a length", () => {
                expect(UtfVisualString.substr(str, 0, 1)).toEqual("🇸🇴");
                expect(UtfVisualString.substr(str, 1, 1)).toEqual("🇫🇷");
            });

            it("works when not given a length", () => {
                expect(UtfVisualString.substr(str, 0)).toEqual("🇸🇴🇫🇷");
                expect(UtfVisualString.substr(str, 1)).toEqual("🇫🇷");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(UtfVisualString.substr(str, 4, 1)).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(UtfVisualString.substr(str, 1, 10)).toEqual("🇫🇷");
            });

            it("accepts a negative start value", () => {
                expect(UtfVisualString.substr(str, -1, 1)).toEqual("🇫🇷");
                expect(UtfVisualString.substr(str, -2, 1)).toEqual("🇸🇴");
            });

            it("returns an empty string if the negative start value is out-of-bounds", () => {
                expect(UtfVisualString.substr(str, -3, 1)).toEqual("🇸🇴");
            });
        });
    });
});
