import expect from "expect";
import { UtfString } from "../src/utf_string";

describe("UtfString", () => {
    describe("#stringToCodePoints", () => {
        it("works with standard ASCII characters", () => {
            const str = "abc";
            expect(UtfString.stringToCodePoints(str)).toEqual([97, 98, 99]);
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう";
            expect(UtfString.stringToCodePoints(str)).toEqual([12354, 12426, 12364, 12392, 12358]);
        });

        it("works with unicode astral plane characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            expect(UtfString.stringToCodePoints(str)).toEqual([148771, 148772, 148773, 148774]);
        });

        it("works with mixed astral and non-astral plane characters", () => {
            const str = "\u0001\u{1F1E6}\u0002";
            expect(UtfString.stringToCodePoints(str)).toEqual([1, 127462, 2]);
        });

        it("works with regional indicators", () => {
            const str = "🇫🇷";
            expect(UtfString.stringToCodePoints(str)).toEqual([127467, 127479]);
        });
    });
});

