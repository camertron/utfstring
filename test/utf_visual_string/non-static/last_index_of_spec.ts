import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#lastIndexOf", () => {
        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇫🇷🇸🇴🇫🇷");
            expect(utfString.lastIndexOf("🇫🇷")).toEqual(2);
            expect(utfString.lastIndexOf("🇫")).toEqual(2);
            expect(utfString.lastIndexOf("🇷")).toEqual(2);
            expect(utfString.lastIndexOf("🇸🇴")).toEqual(1);
        });
    });
});
