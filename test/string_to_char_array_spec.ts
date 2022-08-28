import expect from "expect";
import { UtfString } from "../src/utf_string";

describe("UtfString", () => {
    describe("#stringToCharArray", () => {
        it("works with standard ASCII characters", () => {
            const str = "abc";
            expect(UtfString.stringToCharArray(str)).toEqual(["a", "b", "c"]);
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう";
            expect(UtfString.stringToCharArray(str)).toEqual(["あ", "り", "が", "と", "う"]);
        });

        it("works with unicode astral plane characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            expect(UtfString.stringToCharArray(str)).toEqual(["𤔣", "𤔤", "𤔥", "𤔦"]);
        });
    });
});

