import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#findCharIndex", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.findCharIndex(0)).toEqual(0);
            expect(utfString.findCharIndex(1)).toEqual(1);
            expect(utfString.findCharIndex(2)).toEqual(2);
            expect(utfString.findCharIndex(3)).toEqual(-1);
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.findCharIndex(0)).toEqual(0);
            expect(utfString.findCharIndex(1)).toEqual(1);
            expect(utfString.findCharIndex(2)).toEqual(2);
            expect(utfString.findCharIndex(3)).toEqual(3);
            expect(utfString.findCharIndex(4)).toEqual(4);
            expect(utfString.findCharIndex(5)).toEqual(-1);
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.findCharIndex(0)).toEqual(0);
            expect(utfString.findCharIndex(1)).toEqual(0);
            expect(utfString.findCharIndex(2)).toEqual(1);
            expect(utfString.findCharIndex(3)).toEqual(1);
            expect(utfString.findCharIndex(4)).toEqual(2);
            expect(utfString.findCharIndex(5)).toEqual(2);
            expect(utfString.findCharIndex(6)).toEqual(3);
            expect(utfString.findCharIndex(7)).toEqual(3);
            expect(utfString.findCharIndex(8)).toEqual(-1);
        });

        it("works with a newline character", () => {
            const utfString = new UtfString("\u{000D}\u{1F1E6}");
            expect(utfString.findCharIndex(0)).toEqual(0);
            expect(utfString.findCharIndex(1)).toEqual(1);
            expect(utfString.findCharIndex(2)).toEqual(1);
        });
    });
});

