import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#padStart (static)", () => {
        describe("with standard ASCII characters", () => {
            const str = "abc";

            it("pads to the target length", () => {
                expect(UtfString.padStart(str, 6, "-")).toEqual("---abc");
                expect(UtfString.padStart(str, 8, "+")).toEqual("+++++abc");
            });

            it("pads with spaces by default", () => {
                expect(UtfString.padStart(str, 6)).toEqual("   abc");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfString.padStart(str, 9, "123")).toEqual("123123abc");
                expect(UtfString.padStart(str, 10, "123")).toEqual("1231231abc");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfString.padStart(str, 2, "-")).toEqual("abc");
            });
        });

        describe("with multi-byte characters", () => {
            const str = "ありがとう";

            it("pads to the target length", () => {
                expect(UtfString.padStart(str, 6, "う")).toEqual("うありがとう");
                expect(UtfString.padStart(str, 8, "と")).toEqual("とととありがとう");
            });

            it("pads with spaces by default", () => {
                expect(UtfString.padStart(str, 6)).toEqual(" ありがとう");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfString.padStart(str, 9, "がとう")).toEqual("がとうがありがとう");
                expect(UtfString.padStart(str, 10, "がとう")).toEqual("がとうがとありがとう");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfString.padStart(str, 2, "-")).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";

            it("pads to the target length", () => {
                expect(UtfString.padStart(str, 6, "𤔦")).toEqual("𤔦𤔦𤔣𤔤𤔥𤔦");
                expect(UtfString.padStart(str, 8, "𤔥")).toEqual("𤔥𤔥𤔥𤔥𤔣𤔤𤔥𤔦");
            });

            it("pads with spaces by default", () => {
                expect(UtfString.padStart(str, 6)).toEqual("  𤔣𤔤𤔥𤔦");
            });

            it("pads by repeating the padding string", () => {
                expect(UtfString.padStart(str, 9, "𤔤𤔥𤔦")).toEqual("𤔤𤔥𤔦𤔤𤔥𤔣𤔤𤔥𤔦");
                expect(UtfString.padStart(str, 10, "𤔤𤔥𤔦")).toEqual("𤔤𤔥𤔦𤔤𤔥𤔦𤔣𤔤𤔥𤔦");
            });

            it("doesn't pad if target length is too small", () => {
                expect(UtfString.padStart(str, 2, "-")).toEqual("𤔣𤔤𤔥𤔦");
            });
        });
    });
});

