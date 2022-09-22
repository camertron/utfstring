import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#findCharIndex (static)", () => {
        it("works with standard ASCII characters", () => {
            const str = "abc";
            expect(UtfString.findCharIndex(str, 0)).toEqual(0);
            expect(UtfString.findCharIndex(str, 1)).toEqual(1);
            expect(UtfString.findCharIndex(str, 2)).toEqual(2);
            expect(UtfString.findCharIndex(str, 3)).toEqual(-1);
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう";
            expect(UtfString.findCharIndex(str, 0)).toEqual(0);
            expect(UtfString.findCharIndex(str, 1)).toEqual(1);
            expect(UtfString.findCharIndex(str, 2)).toEqual(2);
            expect(UtfString.findCharIndex(str, 3)).toEqual(3);
            expect(UtfString.findCharIndex(str, 4)).toEqual(4);
            expect(UtfString.findCharIndex(str, 5)).toEqual(-1);
        });

        it("works with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            expect(UtfString.findCharIndex(str, 0)).toEqual(0);
            expect(UtfString.findCharIndex(str, 1)).toEqual(0);
            expect(UtfString.findCharIndex(str, 2)).toEqual(1);
            expect(UtfString.findCharIndex(str, 3)).toEqual(1);
            expect(UtfString.findCharIndex(str, 4)).toEqual(2);
            expect(UtfString.findCharIndex(str, 5)).toEqual(2);
            expect(UtfString.findCharIndex(str, 6)).toEqual(3);
            expect(UtfString.findCharIndex(str, 7)).toEqual(3);
            expect(UtfString.findCharIndex(str, 8)).toEqual(-1);
        });

        it("works with a newline character", () => {
            const str = "\u{000D}\u{1F1E6}";
            expect(UtfString.findCharIndex(str, 0)).toEqual(0);
            expect(UtfString.findCharIndex(str, 1)).toEqual(1);
            expect(UtfString.findCharIndex(str, 2)).toEqual(1);
        });
    });
});
