import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#lastIndexOf (static)", () => {
        it("works with standard ASCII characters", () => {
            const str = "abc";
            expect(UtfString.lastIndexOf(str, "a")).toEqual(0);
            expect(UtfString.lastIndexOf(str, "b")).toEqual(1);
            expect(UtfString.lastIndexOf(str, "c")).toEqual(2);
        });

        it("works with multi-byte characters", () => {
            const str = "ありがとう";
            expect(UtfString.lastIndexOf(str, "あ")).toEqual(0);
            expect(UtfString.lastIndexOf(str, "り")).toEqual(1);
            expect(UtfString.lastIndexOf(str, "が")).toEqual(2);
            expect(UtfString.lastIndexOf(str, "と")).toEqual(3);
            expect(UtfString.lastIndexOf(str, "う")).toEqual(4);
        });

        it("works with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";

            expect(str.lastIndexOf("𤔣")).toEqual(0);
            expect(UtfString.lastIndexOf(str, "𤔣")).toEqual(0);

            expect(str.lastIndexOf("𤔤")).toEqual(2);
            expect(UtfString.lastIndexOf(str, "𤔤")).toEqual(1);

            expect(str.lastIndexOf("𤔥")).toEqual(4);
            expect(UtfString.lastIndexOf(str, "𤔥")).toEqual(2);

            expect(str.lastIndexOf("𤔦")).toEqual(6);
            expect(UtfString.lastIndexOf(str, "𤔦")).toEqual(3);
        });

        it("works with mixed characters", () => {
            const str = "あaりbがc𤔣dとeうf";
            expect(UtfString.lastIndexOf(str, "a")).toEqual(1);
            expect(UtfString.lastIndexOf(str, "が")).toEqual(4);
            expect(UtfString.lastIndexOf(str, "𤔣")).toEqual(6);
            expect(UtfString.lastIndexOf(str, "e")).toEqual(9);
        });

        it("returns -1 if search value is not found", () => {
            expect(UtfString.lastIndexOf("abc", "d")).toEqual(-1);
        });

        it("respects the start parameter", () => {
            expect(UtfString.lastIndexOf("abcabc", "b", 3)).toEqual(1);
            expect(UtfString.lastIndexOf("ありがとうり", "り", 4)).toEqual(1);
            expect(UtfString.lastIndexOf("𤔣𤔤𤔥𤔤𤔦", "𤔤", 2)).toEqual(1);
        });

        it("returns -1 if the search value is not found before the given start parameter", () => {
            expect(UtfString.lastIndexOf("abc", "c", 0)).toEqual(-1);
        });
    });
});
