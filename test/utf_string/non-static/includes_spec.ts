import expect from "expect";
import { UtfString } from "../../../src/utf_string";

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

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.includes(new UtfString("a"))).toBeTruthy();
            expect(utfString.includes(new UtfString("b"))).toBeTruthy();
            expect(utfString.includes(new UtfString("d"))).toBeFalsy();
        });
    });
});

