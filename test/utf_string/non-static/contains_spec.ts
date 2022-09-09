import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#contains", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.contains("a")).toBeTruthy();
            expect(utfString.contains("b")).toBeTruthy();
            expect(utfString.contains("c")).toBeTruthy();
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.contains("あ")).toBeTruthy();
            expect(utfString.contains("り")).toBeTruthy();
            expect(utfString.contains("が")).toBeTruthy();
            expect(utfString.contains("と")).toBeTruthy();
            expect(utfString.contains("う")).toBeTruthy();
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.contains("𤔣")).toBeTruthy();
            expect(utfString.contains("𤔤")).toBeTruthy();
            expect(utfString.contains("𤔥")).toBeTruthy();
            expect(utfString.contains("𤔦")).toBeTruthy();
        });

        it("works with mixed characters", () => {
            const utfString = new UtfString("あaりbがc𤔣dとeうf");
            expect(utfString.contains("a")).toBeTruthy();
            expect(utfString.contains("が")).toBeTruthy();
            expect(utfString.contains("𤔣")).toBeTruthy();
            expect(utfString.contains("e")).toBeTruthy();
        });

        it("returns false if search value is not found", () => {
            const utfString = new UtfString("abc");
            expect(utfString.contains("d")).toBeFalsy();
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.contains(new UtfString("a"))).toBeTruthy();
            expect(utfString.contains(new UtfString("b"))).toBeTruthy();
            expect(utfString.contains(new UtfString("d"))).toBeFalsy();
        });
    });
});

