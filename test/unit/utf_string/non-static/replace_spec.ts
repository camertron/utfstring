import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#replace", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.replace("a", "b")).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.replace("a", "b") === utfString).toBeFalsy();
        });

        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.replace("a", "b").toString()).toEqual("bbc");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.replace("あり", "がと").toString()).toEqual("がとがとう");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.replace("𤔣𤔤", "𤔥𤔦").toString()).toEqual("𤔥𤔦𤔥𤔦");
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString("🇸🇴🇫🇷");
            expect(utfString.replace("🇸🇴", "🇫🇷").toString()).toEqual("🇫🇷🇫🇷");
            expect(utfString.replace("🇸🇴🇫🇷", "").toString()).toEqual("");
        });

        it("works with UtfString parameters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.replace(new UtfString("a"), new UtfString("b")).toString()).toEqual("bbc");
        });

        it("works with a regular expression pattern", () => {
            const utfString = new UtfString("abc");
            expect(utfString.replace(/[a-c]/g, "d").toString()).toEqual("ddd");
        });

        it("works with a replacement function", () => {
            const utfString = new UtfString("abc");
            expect(utfString.replace(/[a-c]/g, () => "d").toString()).toEqual("ddd");
        });
    });
});
