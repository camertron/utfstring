import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#length", () => {
        it("correctly counts single regional indicator characters", () => {
            const utfString = new UtfVisualString("🇸");
            expect(utfString.length).toEqual(1);
        });

        it("correctly counts pairs of regional indicator characters", () => {
            const utfString = new UtfVisualString("🇸🇴");
            expect(utfString.length).toEqual(1);
        });

        it("correctly counts multiple pairs of regional indicator characters", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expect(utfString.length).toEqual(2);
        });
    });
});
