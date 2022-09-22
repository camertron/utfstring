import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#lastIndexOf", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.lastIndexOf("a")).toEqual(0);
            expect(utfString.lastIndexOf("b")).toEqual(1);
            expect(utfString.lastIndexOf("c")).toEqual(2);
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.lastIndexOf("あ")).toEqual(0);
            expect(utfString.lastIndexOf("り")).toEqual(1);
            expect(utfString.lastIndexOf("が")).toEqual(2);
            expect(utfString.lastIndexOf("と")).toEqual(3);
            expect(utfString.lastIndexOf("う")).toEqual(4);
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.lastIndexOf("𤔣")).toEqual(0);
            expect(utfString.lastIndexOf("𤔤")).toEqual(1);
            expect(utfString.lastIndexOf("𤔥")).toEqual(2);
            expect(utfString.lastIndexOf("𤔦")).toEqual(3);
        });

        it("works with mixed characters", () => {
            const utfString = new UtfString("あaりbがc𤔣dとeうf");
            expect(utfString.lastIndexOf("a")).toEqual(1);
            expect(utfString.lastIndexOf("が")).toEqual(4);
            expect(utfString.lastIndexOf("𤔣")).toEqual(6);
            expect(utfString.lastIndexOf("e")).toEqual(9);
        });

        it("returns -1 if search value is not found", () => {
            const utfString = new UtfString("abc");
            expect(utfString.lastIndexOf("d")).toEqual(-1);
        });

        it("respects the start parameter", () => {
            const utfString1 = new UtfString("abcabc");
            expect(utfString1.lastIndexOf("b", 3)).toEqual(1);

            const utfString2 = new UtfString("ありがとうり");
            expect(utfString2.lastIndexOf("り", 4)).toEqual(1);

            const utfString3 = new UtfString("𤔣𤔤𤔥𤔤𤔦");
            expect(utfString3.lastIndexOf("𤔤", 2)).toEqual(1);
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abcabc");
            expect(utfString.lastIndexOf(new UtfString("a"))).toEqual(3);
            expect(utfString.lastIndexOf(new UtfString("b"))).toEqual(4);
            expect(utfString.lastIndexOf(new UtfString("c"))).toEqual(5);
        });
    });
});
