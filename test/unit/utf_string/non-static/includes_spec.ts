import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#includes", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.includes("a")).toBeTruthy();
            expect(utfString.includes("b")).toBeTruthy();
            expect(utfString.includes("c")).toBeTruthy();
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.includes("あ")).toBeTruthy();
            expect(utfString.includes("り")).toBeTruthy();
            expect(utfString.includes("が")).toBeTruthy();
            expect(utfString.includes("と")).toBeTruthy();
            expect(utfString.includes("う")).toBeTruthy();
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.includes("𤔣")).toBeTruthy();
            expect(utfString.includes("𤔤")).toBeTruthy();
            expect(utfString.includes("𤔥")).toBeTruthy();
            expect(utfString.includes("𤔦")).toBeTruthy();
        });

        it("works with mixed characters", () => {
            const utfString = new UtfString("あaりbがc𤔣dとeうf");
            expect(utfString.includes("a")).toBeTruthy();
            expect(utfString.includes("が")).toBeTruthy();
            expect(utfString.includes("𤔣")).toBeTruthy();
            expect(utfString.includes("e")).toBeTruthy();
        });

        it("returns false if search value is not found", () => {
            const utfString = new UtfString("abc");
            expect(utfString.includes("d")).toBeFalsy();
        });

        it("respects the start parameter", () => {
            const utfString1 = new UtfString("abcabc");
            expect(utfString1.includes("b", 0)).toBeTruthy();
            expect(utfString1.includes("b", 2)).toBeTruthy();

            const utfString2 = new UtfString("ありがとうり");
            expect(utfString2.includes("り", 0)).toBeTruthy();
            expect(utfString2.includes("り", 2)).toBeTruthy();

            const utfString3 = new UtfString("𤔣𤔤𤔥𤔤𤔦");
            expect(utfString3.includes("𤔤", 0)).toBeTruthy();
            expect(utfString3.includes("𤔤", 2)).toBeTruthy();
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.includes(new UtfString("a"))).toBeTruthy();
            expect(utfString.includes(new UtfString("b"))).toBeTruthy();
            expect(utfString.includes(new UtfString("d"))).toBeFalsy();
        });

        it("returns false if the search value is not found after the given start parameter", () => {
            const utfString1 = new UtfString("abc");
            expect(utfString1.includes("b", 2)).toBeFalsy();

            const utfString2 = new UtfString("ありが");
            expect(utfString2.includes("り", 2)).toBeFalsy();

            const utfString3 = new UtfString("𤔣𤔤𤔥");
            expect(utfString3.includes("𤔤", 2)).toBeFalsy();
        });
    });
});
