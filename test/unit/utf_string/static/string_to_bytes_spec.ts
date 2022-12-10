import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#stringToBytes (static)", () => {
        it("works with standard ASCII characters", () => {
            const str = "abc";
            expect(UtfString.stringToBytes(str)).toEqual([0, 97, 0, 98, 0, 99]);
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう";
            expect(UtfString.stringToBytes(str)).toEqual([48, 66, 48, 138, 48, 76, 48, 104, 48, 70]);
        });

        it("works with regional indicators", () => {
            const str = "🇸🇴🇫🇷";
            expect(UtfString.stringToBytes(str)).toEqual([
                216, 60, 221, 248, 216, 60, 221, 244, 216, 60, 221, 235, 216, 60, 221, 247,
            ]);
        });

        it("works with unicode astral plane characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            expect(UtfString.stringToBytes(str)).toEqual([
                216, 81, 221, 35, 216, 81, 221, 36, 216, 81, 221, 37, 216, 81, 221, 38,
            ]);
        });
    });
});
