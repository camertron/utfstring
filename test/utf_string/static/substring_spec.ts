import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#substring (static)", () => {
        describe("with standard ASCII characters", () => {
            const str = "abc";

            it("works when given a start and an end index", () => {
                expect(UtfString.substring(str, 0, 1)).toEqual("a");
                expect(UtfString.substring(str, 1, 2)).toEqual("b");
                expect(UtfString.substring(str, 2, 3)).toEqual("c");
                expect(UtfString.substring(str, 1, 3)).toEqual("bc");
            });

            it("returns the rest of string if end index not given", () => {
                expect(UtfString.substring(str, 0)).toEqual("abc");
                expect(UtfString.substring(str, 1)).toEqual("bc");
                expect(UtfString.substring(str, 2)).toEqual("c");
            });

            it("returns up to the length of the string if given an out-of-bounds endIndex", () => {
                expect(UtfString.substring(str, 2, 10)).toEqual("c");
            });

            it("switches start and end if start > end", () => {
                expect(UtfString.substring(str, 3, 1)).toEqual("bc");
                expect(UtfString.substring(str, 6, 0)).toEqual("abc");
            });

            it("accepts a negative start value", () => {
                expect(UtfString.substring(str, -1, 1)).toEqual("a");
                expect(UtfString.substring(str, -2, 1)).toEqual("a");
                expect(UtfString.substring(str, -3, 1)).toEqual("a");
            });

            it("accepts undefined start value", () => {
                expect(UtfString.substring(str, undefined, 3)).toEqual("abc");
            });

            it("accepts NaN start value", () => {
                expect(UtfString.substring(str, NaN, 3)).toEqual("abc");
            });

            it("accepts NaN length value", () => {
                expect(UtfString.substring(str, 0, NaN)).toEqual("");
            });
        });

        describe("with multi-byte characters", () => {
            const str = "ありがとう";

            it("works when given a start and an end index", () => {
                expect(UtfString.substring(str, 0, 1)).toEqual("あ");
                expect(UtfString.substring(str, 1, 2)).toEqual("り");
                expect(UtfString.substring(str, 2, 3)).toEqual("が");
                expect(UtfString.substring(str, 3, 4)).toEqual("と");
                expect(UtfString.substring(str, 4, 5)).toEqual("う");
                expect(UtfString.substring(str, 2, 4)).toEqual("がと");
            });

            it("returns the rest of string if end index not given", () => {
                expect(UtfString.substring(str, 0)).toEqual("ありがとう");
                expect(UtfString.substring(str, 1)).toEqual("りがとう");
                expect(UtfString.substring(str, 2)).toEqual("がとう");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(UtfString.substring(str, 2, 10)).toEqual("がとう");
            });

            it("accepts a negative start value", () => {
                expect(UtfString.substring(str, -1, 1)).toEqual("あ");
                expect(UtfString.substring(str, -2, 1)).toEqual("あ");
                expect(UtfString.substring(str, -3, 1)).toEqual("あ");
            });

            it("switches start and end if start > end", () => {
                expect(UtfString.substring(str, 3, 1)).toEqual("りが");
                expect(UtfString.substring(str, 10, 0)).toEqual("ありがとう");
            });
        });

        describe("with astral plane unicode characters", () => {
            const str = "𤔣𤔤𤔥𤔦";

            it("works when given a start and an end index", () => {
                expect(UtfString.substring(str, 0, 1)).toEqual("𤔣");
                expect(UtfString.substring(str, 1, 2)).toEqual("𤔤");
                expect(UtfString.substring(str, 2, 3)).toEqual("𤔥");
                expect(UtfString.substring(str, 1, 4)).toEqual("𤔤𤔥𤔦");
            });

            it("returns the rest of string if end index not given", () => {
                expect(UtfString.substring(str, 0)).toEqual("𤔣𤔤𤔥𤔦");
                expect(UtfString.substring(str, 1)).toEqual("𤔤𤔥𤔦");
                expect(UtfString.substring(str, 2)).toEqual("𤔥𤔦");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(UtfString.substring(str, 2, 10)).toEqual("𤔥𤔦");
            });

            it("accepts a negative start value", () => {
                expect(UtfString.substring(str, -1, 1)).toEqual("𤔣");
                expect(UtfString.substring(str, -2, 1)).toEqual("𤔣");
                expect(UtfString.substring(str, -3, 1)).toEqual("𤔣");
            });

        });
    });
});

