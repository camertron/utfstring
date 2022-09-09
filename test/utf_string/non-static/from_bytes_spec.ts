import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#fromBytes", () => {
        it("returns an object of type UtfString", () => {
            expect(UtfString.fromBytes([97])).toBeInstanceOf(UtfString);
        });
        
        it("works with standard ASCII characters", () => {
            const arr = [0, 97, 0, 98, 0, 99];
            expect(UtfString.fromBytes(arr).toString()).toEqual("abc");
        });

        it("works with multi-byte characters", () => {
            const arr = [48, 66, 48, 138, 48, 76, 48, 104, 48, 70];
            expect(UtfString.fromBytes(arr).toString()).toEqual("ありがとう");
        });

        it("works with unicode astral plane characters", () => {
            const arr = [216, 81, 221, 35, 216, 81, 221, 36, 216, 81, 221, 37, 216, 81, 221, 38];
            expect(UtfString.fromBytes(arr).toString()).toEqual("𤔣𤔤𤔥𤔦");
        });

        it("works with pairs of regional indicators", () => {
            const arr = [216, 60, 221, 235, 216, 60, 221, 247];
            expect(UtfString.fromBytes(arr).toString()).toEqual("🇫🇷");
        });
    });
});

