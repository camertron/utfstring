import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#uppercase (non-static)", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toUpperCase()).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toUpperCase() === utfString).toBeFalsy();
        });
        describe("with standard ASCII characters", () => {
            it("uppercase letters remain unchanged", () => {
                const utfString = new UtfString("ABC");
                expect(utfString.toUpperCase().toString()).toEqual("ABC");
            });

            it("works with lowercase letters", () => {
                const utfString = new UtfString("abc");
                expect(utfString.toUpperCase().toString()).toEqual("ABC");
            });
        });

        describe("with multi-byte characters", () => {
            it("characters without cases remain unchanged", () => {
                const utfString = new UtfString("ありがとう");
                expect(utfString.toUpperCase().toString()).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            it("characters without cases remain unchanged", () => {
                const utfString = new UtfString("𤔣𤔤𤔥𤔦");
                expect(utfString.toUpperCase().toString()).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});
