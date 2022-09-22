import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#padStart (static)", () => {
        describe("with regional indicators", () => {
            const str = "🇸🇴🇫🇷";

            it("pads to the target length", () => {
                expect(UtfVisualString.padStart(str, 6, "🇸🇴")).toEqual("🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇫🇷");
                expect(UtfVisualString.padStart(str, 8, "🇫🇷")).toEqual("🇫🇷🇫🇷🇫🇷🇫🇷🇫🇷🇫🇷🇸🇴🇫🇷");
            });

            it("pads with spaces by default", () => {
                expect(UtfVisualString.padStart(str, 6)).toEqual("    🇸🇴🇫🇷");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfVisualString.padStart(str, 9, "🇸🇴🇫🇷")).toEqual("🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇸🇴🇫🇷");
                expect(UtfVisualString.padStart(str, 10, "🇸🇴🇫🇷")).toEqual("🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfVisualString.padStart(str, 2, "-")).toEqual("🇸🇴🇫🇷");
            });
        });
    });
});
