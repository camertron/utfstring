import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#padEnd (static)", () => {
        describe("with regional indicators", () => {
            const str = "🇸🇴🇫🇷";

            it("pads to the target length", () => {
                expect(UtfVisualString.padEnd(str, 6, "🇸🇴")).toEqual("🇸🇴🇫🇷🇸🇴🇸🇴🇸🇴🇸🇴");
                expect(UtfVisualString.padEnd(str, 8, "🇫🇷")).toEqual("🇸🇴🇫🇷🇫🇷🇫🇷🇫🇷🇫🇷🇫🇷🇫🇷");
            });

            it("pads with spaces by default", () => {
                expect(UtfVisualString.padEnd(str, 6)).toEqual("🇸🇴🇫🇷    ");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfVisualString.padEnd(str, 9, "🇸🇴🇫🇷")).toEqual("🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴");
                expect(UtfVisualString.padEnd(str, 10, "🇸🇴🇫🇷")).toEqual("🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷🇸🇴🇫🇷");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfVisualString.padEnd(str, 2, "-")).toEqual("🇸🇴🇫🇷");
            });
        });
    });
});

