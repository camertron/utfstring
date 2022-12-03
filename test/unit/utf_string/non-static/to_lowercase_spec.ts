import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#toLowerCase", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toLowerCase()).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toLowerCase() === utfString).toBeFalsy();
        });

        describe("with standard ASCII characters", () => {
            it("changes uppercase letters", () => {
                const utfString = new UtfString("ABC");
                expect(utfString.toLowerCase().toString()).toEqual("abc");
            });

            it("doesn't change non-uppercase characters", () => {
                const utfString = new UtfString("abc123");
                expect(utfString.toLowerCase().toString()).toEqual("abc123");
            });
        });

        describe("with multi-byte characters", () => {
            it("doesn't change non-uppercase characters", () => {
                const utfString = new UtfString("ありがとう");
                expect(utfString.toLowerCase().toString()).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            it("doesn't change non-uppercase characters", () => {
                const utfString = new UtfString("𤔣𤔤𤔥𤔦");
                expect(utfString.toLowerCase().toString()).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});
