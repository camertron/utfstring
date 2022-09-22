import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#startsWith", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.startsWith("a")).toBeTruthy();
            expect(utfString.startsWith("ab")).toBeTruthy();
            expect(utfString.startsWith("abc")).toBeTruthy();

            expect(utfString.startsWith("b")).toBeFalsy();
            expect(utfString.startsWith("bc")).toBeFalsy();
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう"); // "arigatou"
            expect(utfString.startsWith("あ")).toBeTruthy();
            expect(utfString.startsWith("あり")).toBeTruthy();

            expect(utfString.startsWith("う")).toBeFalsy();
            expect(utfString.startsWith("とう")).toBeFalsy();
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.startsWith("𤔣")).toBeTruthy();
            expect(utfString.startsWith("𤔣𤔤")).toBeTruthy();

            expect(utfString.startsWith("𤔦")).toBeFalsy();
            expect(utfString.startsWith("𤔥𤔦")).toBeFalsy();
        });

        it("works with a specific start position", () => {
            const utfString = new UtfString("abc");
            expect(utfString.startsWith("bc", 1)).toBeTruthy();
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.startsWith(new UtfString("ab"))).toBeTruthy();
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString("🇸🇴🇫🇷");
            expect(utfString.startsWith("🇸")).toBeTruthy();
            expect(utfString.startsWith("🇸🇴")).toBeTruthy();
        });
    });
});
