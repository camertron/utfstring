import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#toUpperCase", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toUpperCase()).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toUpperCase() === utfString).toBeFalsy();
        });

        describe("with standard ASCII characters", () => {
            it("doesn't change non-lowercase characters", () => {
                const utfString = new UtfString("ABC123");
                expect(utfString.toUpperCase().toString()).toEqual("ABC123");
            });

            it("changes lowercase letters", () => {
                const utfString = new UtfString("abc");
                expect(utfString.toUpperCase().toString()).toEqual("ABC");
            });
        });

        describe("with multi-byte characters", () => {
            it("doesn't change non-lowercase characters", () => {
                const utfString = new UtfString("ありがとう");
                expect(utfString.toUpperCase().toString()).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            it("doesn't change non-lowercase characters", () => {
                const utfString = new UtfString("𤔣𤔤𤔥𤔦");
                expect(utfString.toUpperCase().toString()).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});
