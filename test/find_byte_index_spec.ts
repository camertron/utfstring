import expect from "expect";
import { UtfString } from "../src/utf_string";

describe("UtfString", () => {
    describe("#findByteIndex", () => {
        it("works with standard ASCII characters", () => {
            const str = "abc";
            expect(UtfString.findByteIndex(str, 0)).toEqual(0);
            expect(UtfString.findByteIndex(str, 1)).toEqual(1);
            expect(UtfString.findByteIndex(str, 2)).toEqual(2);
            expect(UtfString.findByteIndex(str, 3)).toEqual(-1);
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう";
            expect(UtfString.findByteIndex(str, 0)).toEqual(0);
            expect(UtfString.findByteIndex(str, 1)).toEqual(1);
            expect(UtfString.findByteIndex(str, 2)).toEqual(2);
            expect(UtfString.findByteIndex(str, 3)).toEqual(3);
            expect(UtfString.findByteIndex(str, 4)).toEqual(4);
            expect(UtfString.findByteIndex(str, 5)).toEqual(-1);
        });

        it("works with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            expect(UtfString.findByteIndex(str, 0)).toEqual(0);
            expect(UtfString.findByteIndex(str, 1)).toEqual(2);
            expect(UtfString.findByteIndex(str, 2)).toEqual(4);
            expect(UtfString.findByteIndex(str, 3)).toEqual(6);
            expect(UtfString.findByteIndex(str, 4)).toEqual(-1);
        });

        it("works with mixed characters", () => {
            const str = "\u{0001}\u{1F1E6}";
            expect(UtfString.findByteIndex(str, 0)).toEqual(0);
            expect(UtfString.findByteIndex(str, 1)).toEqual(1);
        });
    });
});

