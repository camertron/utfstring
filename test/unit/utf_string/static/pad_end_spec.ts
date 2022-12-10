import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#padEnd (static)", () => {
        describe("with standard ASCII characters", () => {
            const str = "abc";

            it("pads to the target length", () => {
                expect(UtfString.padEnd(str, 6, "-")).toEqual("abc---");
                expect(UtfString.padEnd(str, 8, "+")).toEqual("abc+++++");
            });

            it("pads with spaces by default", () => {
                expect(UtfString.padEnd(str, 6)).toEqual("abc   ");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfString.padEnd(str, 9, "123")).toEqual("abc123123");
                expect(UtfString.padEnd(str, 10, "123")).toEqual("abc1231231");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfString.padEnd(str, 2, "-")).toEqual("abc");
            });
        });

        describe("with multi-byte characters", () => {
            const str = "ありがとう";

            it("pads to the target length", () => {
                expect(UtfString.padEnd(str, 6, "う")).toEqual("ありがとうう");
                expect(UtfString.padEnd(str, 8, "と")).toEqual("ありがとうととと");
            });

            it("pads with spaces by default", () => {
                expect(UtfString.padEnd(str, 6)).toEqual("ありがとう ");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfString.padEnd(str, 9, "がとう")).toEqual("ありがとうがとうが");
                expect(UtfString.padEnd(str, 10, "がとう")).toEqual("ありがとうがとうがと");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfString.padEnd(str, 2, "-")).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";

            it("pads to the target length", () => {
                expect(UtfString.padEnd(str, 6, "𤔦")).toEqual("𤔣𤔤𤔥𤔦𤔦𤔦");
                expect(UtfString.padEnd(str, 8, "𤔥")).toEqual("𤔣𤔤𤔥𤔦𤔥𤔥𤔥𤔥");
            });

            it("pads with spaces by default", () => {
                expect(UtfString.padEnd(str, 6)).toEqual("𤔣𤔤𤔥𤔦  ");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfString.padEnd(str, 9, "𤔤𤔥𤔦")).toEqual("𤔣𤔤𤔥𤔦𤔤𤔥𤔦𤔤𤔥");
                expect(UtfString.padEnd(str, 10, "𤔤𤔥𤔦")).toEqual("𤔣𤔤𤔥𤔦𤔤𤔥𤔦𤔤𤔥𤔦");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfString.padEnd(str, 2, "-")).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});
