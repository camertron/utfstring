import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#toCodePoints", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toCodePoints()).toEqual([97, 98, 99]);
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.toCodePoints()).toEqual([12354, 12426, 12364, 12392, 12358]);
        });

        it("works with unicode astral plane characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.toCodePoints()).toEqual([148771, 148772, 148773, 148774]);
        });

        it("works with mixed astral and non-astral plane characters", () => {
            const utfString = new UtfString("\u0001\u{1F1E6}\u0002");
            expect(utfString.toCodePoints()).toEqual([1, 127462, 2]);
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString("🇫🇷");
            expect(utfString.toCodePoints()).toEqual([127467, 127479]);
        });
    });
});
