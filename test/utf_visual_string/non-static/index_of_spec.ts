import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#indexOf", () => {
        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expect(utfString.indexOf("🇸🇴")).toEqual(0);
            expect(utfString.indexOf("🇫🇷")).toEqual(1);
            expect(utfString.indexOf("🇸")).toEqual(0);
            expect(utfString.indexOf("🇴")).toEqual(0);
            expect(utfString.indexOf("🇫")).toEqual(1);
            expect(utfString.indexOf("🇷")).toEqual(1);
        });
    });
});

