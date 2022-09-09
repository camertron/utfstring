import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#findByteIndex", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.findByteIndex(0)).toEqual(0);
            expect(utfString.findByteIndex(1)).toEqual(1);
            expect(utfString.findByteIndex(2)).toEqual(2);
            expect(utfString.findByteIndex(3)).toEqual(-1);
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.findByteIndex(0)).toEqual(0);
            expect(utfString.findByteIndex(1)).toEqual(1);
            expect(utfString.findByteIndex(2)).toEqual(2);
            expect(utfString.findByteIndex(3)).toEqual(3);
            expect(utfString.findByteIndex(4)).toEqual(4);
            expect(utfString.findByteIndex(5)).toEqual(-1);
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.findByteIndex(0)).toEqual(0);
            expect(utfString.findByteIndex(1)).toEqual(2);
            expect(utfString.findByteIndex(2)).toEqual(4);
            expect(utfString.findByteIndex(3)).toEqual(6);
            expect(utfString.findByteIndex(4)).toEqual(-1);
        });

        it("works with mixed characters", () => {
            const utfString = new UtfString("\u{0001}\u{1F1E6}");
            expect(utfString.findByteIndex(0)).toEqual(0);
            expect(utfString.findByteIndex(1)).toEqual(1);
        });
    });
});

