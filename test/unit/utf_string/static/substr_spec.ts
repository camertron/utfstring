import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#substr (static)", () => {
        describe("with standard ASCII characters", () => {
            const str = "abc";

            it("works when given a start and a length", () => {
                expect(UtfString.substr(str, 0, 1)).toEqual("a");
                expect(UtfString.substr(str, 1, 1)).toEqual("b");
                expect(UtfString.substr(str, 2, 1)).toEqual("c");
            });

            it("works when not given a length", () => {
                expect(UtfString.substr(str, 0)).toEqual("abc");
                expect(UtfString.substr(str, 1)).toEqual("bc");
                expect(UtfString.substr(str, 2)).toEqual("c");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(UtfString.substr(str, 3, 1)).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(UtfString.substr(str, 2, 10)).toEqual("c");
            });

            it("accepts a negative start value", () => {
                expect(UtfString.substr(str, -1, 1)).toEqual("c");
                expect(UtfString.substr(str, -2, 1)).toEqual("b");
                expect(UtfString.substr(str, -3, 1)).toEqual("a");
            });

            it("treats a negative start value which is out-of-bounds as 0", () => {
                expect(UtfString.substr(str, -4, 1)).toEqual("a");
            });

            it("treats an undefined start value as 0", () => {
                expect(UtfString.substr(str, undefined, 3)).toEqual("abc");
            });

            it("treats a NaN start value as 0", () => {
                expect(UtfString.substr(str, NaN, 3)).toEqual("abc");
            });

            it("accepts an undefined length value", () => {
                expect(UtfString.substr(str, 0)).toEqual("abc");
            });

            it("treats a length value of NaN as 0", () => {
                expect(UtfString.substr(str, 0, NaN)).toEqual("");
            });
        });

        describe("with multi-byte characters", () => {
            const str = "ありがとう";

            it("works when given a start and a length", () => {
                expect(UtfString.substr(str, 0, 1)).toEqual("あ");
                expect(UtfString.substr(str, 1, 1)).toEqual("り");
                expect(UtfString.substr(str, 2, 1)).toEqual("が");
                expect(UtfString.substr(str, 3, 1)).toEqual("と");
                expect(UtfString.substr(str, 4, 1)).toEqual("う");
            });

            it("works when not given a length", () => {
                expect(UtfString.substr(str, 0)).toEqual("ありがとう");
                expect(UtfString.substr(str, 1)).toEqual("りがとう");
                expect(UtfString.substr(str, 2)).toEqual("がとう");
                expect(UtfString.substr(str, 3)).toEqual("とう");
                expect(UtfString.substr(str, 4)).toEqual("う");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(UtfString.substr(str, 5, 1)).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(UtfString.substr(str, 2, 10)).toEqual("がとう");
            });

            it("accepts a negative start value", () => {
                expect(UtfString.substr(str, -1, 1)).toEqual("う");
                expect(UtfString.substr(str, -2, 1)).toEqual("と");
                expect(UtfString.substr(str, -3, 1)).toEqual("が");
                expect(UtfString.substr(str, -4, 1)).toEqual("り");
                expect(UtfString.substr(str, -5, 1)).toEqual("あ");
            });

            it("treats a negative start value which is out-of-bounds as 0", () => {
                expect(UtfString.substr(str, -6, 1)).toEqual("あ");
            });
        });

        describe("with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";

            it("works when given a start and a length", () => {
                expect(UtfString.substr(str, 0, 1)).toEqual("𤔣");
                expect(UtfString.substr(str, 1, 1)).toEqual("𤔤");
                expect(UtfString.substr(str, 2, 1)).toEqual("𤔥");
                expect(UtfString.substr(str, 3, 1)).toEqual("𤔦");
            });

            it("works when not given a length", () => {
                expect(UtfString.substr(str, 0)).toEqual("𤔣𤔤𤔥𤔦");
                expect(UtfString.substr(str, 1)).toEqual("𤔤𤔥𤔦");
                expect(UtfString.substr(str, 2)).toEqual("𤔥𤔦");
                expect(UtfString.substr(str, 3)).toEqual("𤔦");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(UtfString.substr(str, 4, 1)).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(UtfString.substr(str, 2, 10)).toEqual("𤔥𤔦");
            });

            it("accepts a negative start value", () => {
                expect(UtfString.substr(str, -1, 1)).toEqual("𤔦");
                expect(UtfString.substr(str, -2, 1)).toEqual("𤔥");
                expect(UtfString.substr(str, -3, 1)).toEqual("𤔤");
                expect(UtfString.substr(str, -4, 1)).toEqual("𤔣");
            });

            it("treats a negative start value which is out-of-bounds as 0", () => {
                expect(UtfString.substr(str, -5, 1)).toEqual("𤔣");
            });
        });
    });
});
