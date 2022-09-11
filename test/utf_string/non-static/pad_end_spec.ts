import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#padEnd", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.padEnd(6, "d")).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.padEnd(6, "d") === utfString).toBeFalsy();
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.padEnd(6, new UtfString("-")).toString()).toEqual("abc---");
        });

        describe("with standard ASCII characters", () => {
            const utfString = new UtfString("abc");

            it("pads to the target length", () => {
                expect(utfString.padEnd(6, "-").toString()).toEqual("abc---");
                expect(utfString.padEnd(8, "+").toString()).toEqual("abc+++++");
            });

            it("pads with spaces by default", () => {
                expect(utfString.padEnd(6).toString()).toEqual("abc   ");
            });

            it("pads by repeating the padding string", () => {
                expect(utfString.padEnd(9, "123").toString()).toEqual("abc123123");
                expect(utfString.padEnd(10, "123").toString()).toEqual("abc1231231");
            });

            it("doesn't pad if target length is too small", () => {
                expect(utfString.padEnd(2, "-").toString()).toEqual("abc");
            });
        });

        describe("with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");

            it("pads to the target length", () => {
                expect(utfString.padEnd(6, "う").toString()).toEqual("ありがとうう");
                expect(utfString.padEnd(8, "と").toString()).toEqual("ありがとうととと");
            });

            it("pads with spaces by default", () => {
                expect(utfString.padEnd(6).toString()).toEqual("ありがとう ");
            });

            it("pads by repeating the padding string", () => {
                expect(utfString.padEnd(9, "がとう").toString()).toEqual("ありがとうがとうが");
                expect(utfString.padEnd(10, "がとう").toString()).toEqual("ありがとうがとうがと");
            });

            it("doesn't pad if target length is too small", () => {
                expect(utfString.padEnd(2, "-").toString()).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");

            it("pads to the target length", () => {
                expect(utfString.padEnd(6, "𤔦").toString()).toEqual("𤔣𤔤𤔥𤔦𤔦𤔦");
                expect(utfString.padEnd(8, "𤔥").toString()).toEqual("𤔣𤔤𤔥𤔦𤔥𤔥𤔥𤔥");
            });

            it("pads with spaces by default", () => {
                expect(utfString.padEnd(6).toString()).toEqual("𤔣𤔤𤔥𤔦  ");
            });

            it("pads by repeating the padding string", () => {
                expect(utfString.padEnd(9, "𤔤𤔥𤔦").toString()).toEqual("𤔣𤔤𤔥𤔦𤔤𤔥𤔦𤔤𤔥");
                expect(utfString.padEnd(10, "𤔤𤔥𤔦").toString()).toEqual("𤔣𤔤𤔥𤔦𤔤𤔥𤔦𤔤𤔥𤔦");
            });

            it("doesn't pad if target length is too small", () => {
                expect(utfString.padEnd(2, "-").toString()).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});

