import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#padStart", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.padStart(6, "d")).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.padStart(6, "d") === utfString).toBeFalsy();
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.padStart(6, new UtfString("-")).toString()).toEqual("---abc");
        });

        describe("with standard ASCII characters", () => {
            const utfString = new UtfString("abc");

            it("pads to the target length", () => {
                expect(utfString.padStart(6, "-").toString()).toEqual("---abc");
                expect(utfString.padStart(8, "+").toString()).toEqual("+++++abc");
            });

            it("pads with spaces by default", () => {
                expect(utfString.padStart(6).toString()).toEqual("   abc");
            });

            it("pads by repeating the padding string", () => {
                expect(utfString.padStart(9, "123").toString()).toEqual("123123abc");
                expect(utfString.padStart(10, "123").toString()).toEqual("1231231abc");
            });

            it("doesn't pad if target length is too small", () => {
                expect(utfString.padStart(2, "-").toString()).toEqual("abc");
            });
        });

        describe("with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");

            it("pads to the target length", () => {
                expect(utfString.padStart(6, "う").toString()).toEqual("うありがとう");
                expect(utfString.padStart(8, "と").toString()).toEqual("とととありがとう");
            });

            it("pads with spaces by default", () => {
                expect(utfString.padStart(6).toString()).toEqual(" ありがとう");
            });

            it("pads by repeating the padding string", () => {
                expect(utfString.padStart(9, "がとう").toString()).toEqual("がとうがありがとう");
                expect(utfString.padStart(10, "がとう").toString()).toEqual("がとうがとありがとう");
            });

            it("doesn't pad if target length is too small", () => {
                expect(utfString.padStart(2, "-").toString()).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");

            it("pads to the target length", () => {
                expect(utfString.padStart(6, "𤔦").toString()).toEqual("𤔦𤔦𤔣𤔤𤔥𤔦");
                expect(utfString.padStart(8, "𤔥").toString()).toEqual("𤔥𤔥𤔥𤔥𤔣𤔤𤔥𤔦");
            });

            it("pads with spaces by default", () => {
                expect(utfString.padStart(6).toString()).toEqual("  𤔣𤔤𤔥𤔦");
            });

            it("pads by repeating the padding string", () => {
                expect(utfString.padStart(9, "𤔤𤔥𤔦").toString()).toEqual("𤔤𤔥𤔦𤔤𤔥𤔣𤔤𤔥𤔦");
                expect(utfString.padStart(10, "𤔤𤔥𤔦").toString()).toEqual("𤔤𤔥𤔦𤔤𤔥𤔦𤔣𤔤𤔥𤔦");
            });

            it("doesn't pad if target length is too small", () => {
                expect(utfString.padStart(2, "-").toString()).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});
