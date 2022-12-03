import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#toBytes", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toBytes()).toEqual([0, 97, 0, 98, 0, 99]);
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.toBytes()).toEqual([48, 66, 48, 138, 48, 76, 48, 104, 48, 70]);
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString("🇸🇴🇫🇷");
            expect(utfString.toBytes()).toEqual([
                216, 60, 221, 248, 216, 60, 221, 244, 216, 60, 221, 235, 216, 60, 221, 247,
            ]);
        });

        it("works with unicode astral plane characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.toBytes()).toEqual([
                216, 81, 221, 35, 216, 81, 221, 36, 216, 81, 221, 37, 216, 81, 221, 38,
            ]);
        });
    });
});
