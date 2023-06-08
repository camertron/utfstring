import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#indexOf", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.indexOf("a")).toEqual(0);
            expect(utfString.indexOf("b")).toEqual(1);
            expect(utfString.indexOf("c")).toEqual(2);
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.indexOf("あ")).toEqual(0);
            expect(utfString.indexOf("り")).toEqual(1);
            expect(utfString.indexOf("が")).toEqual(2);
            expect(utfString.indexOf("と")).toEqual(3);
            expect(utfString.indexOf("う")).toEqual(4);
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.indexOf("𤔣")).toEqual(0);
            expect(utfString.indexOf("𤔤")).toEqual(1);
            expect(utfString.indexOf("𤔥")).toEqual(2);
            expect(utfString.indexOf("𤔦")).toEqual(3);
        });

        it("works with mixed characters", () => {
            const utfString = new UtfString("あaりbがc𤔣dとeうf");
            expect(utfString.indexOf("a")).toEqual(1);
            expect(utfString.indexOf("が")).toEqual(4);
            expect(utfString.indexOf("𤔣")).toEqual(6);
            expect(utfString.indexOf("e")).toEqual(9);
        });

        it("returns -1 if search value is not found", () => {
            const utfString = new UtfString("abc");
            expect(utfString.indexOf("d")).toEqual(-1);
        });

        it("respects the start parameter", () => {
            const utfString1 = new UtfString("abcabc");
            expect(utfString1.indexOf("b", 2)).toEqual(4);

            const utfString2 = new UtfString("ありがとうり");
            expect(utfString2.indexOf("り", 2)).toEqual(5);

            const utfString3 = new UtfString("𤔣𤔤𤔥𤔤𤔦");
            expect(utfString3.indexOf("𤔤", 2)).toEqual(3);
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.indexOf(new UtfString("a"))).toEqual(0);
            expect(utfString.indexOf(new UtfString("b"))).toEqual(1);
            expect(utfString.indexOf(new UtfString("c"))).toEqual(2);
        });

        it("returns -1 if the search value is not found after the given start parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.indexOf("c", 3)).toEqual(-1);
        });
    });
});
