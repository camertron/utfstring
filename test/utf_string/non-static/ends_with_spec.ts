import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#endsWith", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.endsWith("c")).toBeTruthy();
            expect(utfString.endsWith("bc")).toBeTruthy();
            expect(utfString.endsWith("abc")).toBeTruthy();

            expect(utfString.endsWith("a")).toBeFalsy();
            expect(utfString.endsWith("ab")).toBeFalsy();
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう"); // "arigatou"
            expect(utfString.endsWith("う")).toBeTruthy();
            expect(utfString.endsWith("とう")).toBeTruthy();

            expect(utfString.endsWith("あ")).toBeFalsy();
            expect(utfString.endsWith("あり")).toBeFalsy();
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.endsWith("𤔦")).toBeTruthy();
            expect(utfString.endsWith("𤔥𤔦")).toBeTruthy();

            expect(utfString.endsWith("𤔣")).toBeFalsy();
            expect(utfString.endsWith("𤔣𤔤")).toBeFalsy();
        });

        it("works with a specific end position", () => {
            const utfString = new UtfString("abc");
            expect(utfString.endsWith("ab", 2)).toBeTruthy();
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.endsWith(new UtfString("bc"))).toBeTruthy();
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString("🇸🇴🇫🇷");
            expect(utfString.endsWith("🇷")).toBeTruthy();
            expect(utfString.endsWith("🇫🇷")).toBeTruthy();
        });
    });
});
