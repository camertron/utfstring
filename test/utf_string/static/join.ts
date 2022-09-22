import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#join (static)", () => {
        it("returns UtfString Object", () => {
            const strArray = ["a", "b", "c"];
            expect(UtfString.join(strArray, "")).toBeInstanceOf(UtfString);
        });

        it("works with default seperator (,)", () => {
            const strArray = ["a", "b", "cd"];
            expect(UtfString.join(strArray).toString()).toEqual("a,b,cd");
        });

        it("works with standard ASCII characters", () => {
            const strArray = ["a", "b", "cd"];
            expect(UtfString.join(strArray, "").toString()).toEqual("abcd");
        });

        it("works with multi-byte characters", () => {
            const strArray = ["あ", "り", "がとう"];
            expect(UtfString.join(strArray, "").toString()).toEqual("ありがとう");
        });

        it("works with multi-byte character as seperator", () => {
            const strArray = ["a", "b", "c"];
            expect(UtfString.join(strArray, "あ").toString()).toEqual("aあbあc");
        });

        it("works with unicode astral plane characters", () => {
            const strArray = ["𤔣", "𤔤", "𤔥𤔦"];
            expect(UtfString.join(strArray, "").toString()).toEqual("𤔣𤔤𤔥𤔦");
        });

        it("works with unicode astral plane character as seperator", () => {
            const strArray = ["a", "b", "c"];
            expect(UtfString.join(strArray, "𤔣").toString()).toEqual("a𤔣b𤔣c");
        });

        it("works with numbers", () => {
            const strArray = [1, 2, 34];
            expect(UtfString.join(strArray, "").toString()).toEqual("1234");
        });

        it("works with objects", () => {
            const strArray: Object[] = [{ x: 1 }, { toString: () => "test" }];
            expect(UtfString.join(strArray, "").toString()).toEqual("[object Object]test");
        });

        it("works with many types", () => {
            const strArray: Object[] = ["a", "あ", "𤔣", 1, { x: 1 }, { toString: () => "test" }];
            expect(UtfString.join(strArray, "").toString()).toEqual("aあ𤔣1[object Object]test");
        });
    });
});
