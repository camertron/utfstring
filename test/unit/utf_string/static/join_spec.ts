import expect from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#join (static)", () => {
        it("returns a UtfString object", () => {
            const arr = ["a", "b", "c"];
            expect(UtfString.join(arr, "")).toBeInstanceOf(UtfString);
        });

        it("works with the default seperator (,)", () => {
            const arr = ["a", "b", "cd"];
            expect(UtfString.join(arr).toString()).toEqual("a,b,cd");
        });

        it("works with standard ASCII characters", () => {
            const arr = ["a", "b", "cd"];
            expect(UtfString.join(arr, "").toString()).toEqual("abcd");
        });

        it("works with multi-byte characters", () => {
            const arr = ["あ", "り", "がとう"];
            expect(UtfString.join(arr, "").toString()).toEqual("ありがとう");
        });

        it("works with a multi-byte character seperator", () => {
            const arr = ["a", "b", "c"];
            expect(UtfString.join(arr, "あ").toString()).toEqual("aあbあc");
        });

        it("works with unicode astral plane characters", () => {
            const arr = ["𤔣", "𤔤", "𤔥𤔦"];
            expect(UtfString.join(arr, "").toString()).toEqual("𤔣𤔤𤔥𤔦");
        });

        it("works with a unicode astral plane character seperator", () => {
            const arr = ["a", "b", "c"];
            expect(UtfString.join(arr, "𤔣").toString()).toEqual("a𤔣b𤔣c");
        });

        it("works with numbers", () => {
            const arr = [1, 2, 34];
            expect(UtfString.join(arr, "").toString()).toEqual("1234");
        });

        it("works with objects", () => {
            const arr: Object[] = [{ x: 1 }, { toString: () => "test" }];
            expect(UtfString.join(arr, "").toString()).toEqual("[object Object]test");
        });

        it("works with different types", () => {
            const arr: Object[] = ["a", "あ", "𤔣", 1, { x: 1 }, { toString: () => "test" }];
            expect(UtfString.join(arr, "").toString()).toEqual("aあ𤔣1[object Object]test");
        });
    });
});
