import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#toCharArray", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toCharArray()).toEqual(["a", "b", "c"]);
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.toCharArray()).toEqual(["あ", "り", "が", "と", "う"]);
        });

        it("works with unicode astral plane characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.toCharArray()).toEqual(["𤔣", "𤔤", "𤔥", "𤔦"]);
        });
    });
});

