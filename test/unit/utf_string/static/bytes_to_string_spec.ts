import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#bytesToString (static)", () => {
        it("works with standard ASCII characters", () => {
            const arr = [0, 97, 0, 98, 0, 99];
            expect(UtfString.bytesToString(arr)).toEqual("abc");
        });

        it("works with multi-byte characters", () => {
            const arr = [48, 66, 48, 138, 48, 76, 48, 104, 48, 70];
            expect(UtfString.bytesToString(arr)).toEqual("ありがとう");
        });

        it("works with unicode astral plane characters", () => {
            const arr = [216, 81, 221, 35, 216, 81, 221, 36, 216, 81, 221, 37, 216, 81, 221, 38];
            expect(UtfString.bytesToString(arr)).toEqual("𤔣𤔤𤔥𤔦");
        });

        it("works with pairs of regional indicators", () => {
            const arr = [216, 60, 221, 235, 216, 60, 221, 247];
            expect(UtfString.bytesToString(arr)).toEqual("🇫🇷");
        });
    });
});
