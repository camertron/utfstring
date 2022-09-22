import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#lowercase (non-static)", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toLowerCase()).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.toLowerCase() === utfString).toBeFalsy();
        });
        describe("with standard ASCII characters", () => {
            it("works with uppercase letters", () => {
                const utfString = new UtfString("ABC");
                expect(utfString.toLowerCase().toString()).toEqual("abc");
            });

            it("lowercase letters remain unchanged", () => {
                const utfString = new UtfString("abc");
                expect(utfString.toLowerCase().toString()).toEqual("abc");
            });
        });

        describe("with multi-byte characters", () => {
            it("characters without cases remain unchanged", () => {
                const utfString = new UtfString("ありがとう");
                expect(utfString.toLowerCase().toString()).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            it("characters without cases remain unchanged", () => {
                const utfString = new UtfString("𤔣𤔤𤔥𤔦");
                expect(utfString.toLowerCase().toString()).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});
