import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#repeat", () => {
        const utfString = new UtfString("abc");

        it("returns an object of type UtfString", () => {
            expect(utfString.repeat(3)).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            expect(utfString.repeat(3) === utfString).toBeFalsy();
        });

        it("works with standard ASCII characters", () => {
            expect(utfString.repeat(3).toString()).toEqual("abcabcabc");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            expect(utfString.repeat(2).toString()).toEqual("ありがとうありがとう");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.repeat(2).toString()).toEqual("𤔣𤔤𤔥𤔦𤔣𤔤𤔥𤔦");
        });

        it("returns an empty string if parameter is 0", () => {
            expect(utfString.repeat(0).toString()).toEqual("");
        });

        it("throws if parameter is negative", () => {
            expect(() => utfString.repeat(-2)).toThrow(RangeError);
        });

        it("throws if parameter is Infinity", () => {
            expect(() => utfString.repeat(Infinity)).toThrow(RangeError);
        });
    });
});
