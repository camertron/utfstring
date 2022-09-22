import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#includes", () => {
        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expect(utfString.includes("🇸🇴")).toBeTruthy();
            expect(utfString.includes("🇫🇷")).toBeTruthy();
            expect(utfString.includes("🇸")).toBeTruthy();
            expect(utfString.includes("🇴")).toBeTruthy();
            expect(utfString.includes("🇫")).toBeTruthy();
            expect(utfString.includes("🇷")).toBeTruthy();
        });
    });
});
