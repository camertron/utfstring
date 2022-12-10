import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#constructor", () => {
        it("creates an empty string object when called with null", () => {
            expect(new UtfString(null).toString()).toEqual("");
        });

        it("creates an empty string object when called with undefined", () => {
            expect(new UtfString(undefined).toString()).toEqual("");
        });

        it("works with another UtfString object", () => {
            expect(new UtfString(new UtfString("asdf")).toString()).toEqual("asdf");
        });

        it("works with ASCII strings", () => {
            expect(new UtfString("abc").toString()).toEqual("abc");
        });

        it("works with multi-byte character strings", () => {
            expect(new UtfString("ありがとう").toString()).toEqual("ありがとう"); // "arigatou"
        });

        it("works with astral plane unicode character strings", () => {
            expect(new UtfString("𤔣𤔤𤔥𤔦").toString()).toEqual("𤔣𤔤𤔥𤔦");
        });

        it("works with strings containing regional indicator pairs", () => {
            expect(new UtfString("🇸🇴🇫🇷").toString()).toEqual("🇸🇴🇫🇷");
        });

        it("works with numbers", () => {
            expect(new UtfString(-1).toString()).toEqual("-1");
            expect(new UtfString(0).toString()).toEqual("0");
            expect(new UtfString(42).toString()).toEqual("42");
            expect(new UtfString(3.1415).toString()).toEqual("3.1415");
        });

        it("works with NaN", () => {
            expect(new UtfString(NaN).toString()).toEqual("NaN");
        });

        it("works with booleans", () => {
            expect(new UtfString(true).toString()).toEqual("true");
            expect(new UtfString(false).toString()).toEqual("false");
        });
    });
});
