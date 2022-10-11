import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#length", () => {
        it("counts the number of characters in an ASCII string", () => {
            const utfString = new UtfString("abc");
            expect(utfString.length).toEqual(3);
        });

        it("counts the number of characters in a multi-byte string", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.length).toEqual(5);
        });

        it("counts the number of astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣");
            expect(utfString.length).toEqual(1);
        });

        it("counts the number of astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.length).toEqual(4);
        });

        it("counts the number of characters in a mixed string", () => {
            const utfString = new UtfString("あaりbがc𤔣dとeうf🇫🇷g");
            expect(utfString.length).toEqual(15);
        });

        it("works correctly with newline characters", () => {
            const utfString = new UtfString("\u{000D}\u{1F1E6}");
            expect(utfString.length).toEqual(2);
        });

        it("returns zero when the string is empty", () => {
            const utfString = new UtfString("");
            expect(utfString.length).toEqual(0);
        });
    });
});
