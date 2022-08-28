import expect from "expect";
import { UtfString } from "../src/utf_string";

describe("UtfString", () => {
    describe("#lengthOf", () => {
        it("counts the number of characters in an ASCII string", () => {
            const str = "abc";
            expect(str.length).toEqual(3);
            expect(UtfString.lengthOf(str)).toEqual(3);
        });

        it("counts the number of characters in a multi-byte string", () => {
            const str = "ありがとう";
            expect(str.length).toEqual(5);
            expect(UtfString.lengthOf(str)).toEqual(5);
        });

        it("counts the number of astral plane unicode characters", () => {
            const str = "𤔣";
            expect(str.length).toEqual(2);
            expect(UtfString.lengthOf(str)).toEqual(1);
        });

        it("counts the number of astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";
            expect(str.length).toEqual(8);
            expect(UtfString.lengthOf(str)).toEqual(4);
        });

        it("counts the number of characters in a mixed string", () => {
            const str = "あaりbがc𤔣dとeうf🇫🇷g";
            expect(UtfString.lengthOf(str)).toEqual(15);
        });

        it("works correctly with newline characters", () => {
            const str = "\u{000D}\u{1F1E6}";
            expect(str.length).toEqual(3);
            expect(UtfString.lengthOf(str)).toEqual(2);
        });

        it("returns zero when the string is empty", () => {
            expect(UtfString.lengthOf("")).toEqual(0);
        });
    });
});

