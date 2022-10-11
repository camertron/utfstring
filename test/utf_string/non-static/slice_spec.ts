import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#slice", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.slice(0, 1)).toBeInstanceOf(UtfString);
        });

        describe("with standard ASCII characters", () => {
            const utfString = new UtfString("abc");

            it("works when given start and end indices", () => {
                expect(utfString.slice(0, 1).toString()).toEqual("a");
                expect(utfString.slice(1, 2).toString()).toEqual("b");
                expect(utfString.slice(2, 3).toString()).toEqual("c");

                expect(utfString.slice(1, 3).toString()).toEqual("bc");
                expect(utfString.slice(0, 3).toString()).toEqual("abc");
            });

            it("works when not given an end index", () => {
                expect(utfString.slice(0).toString()).toEqual("abc");
                expect(utfString.slice(1).toString()).toEqual("bc");
                expect(utfString.slice(2).toString()).toEqual("c");
            });

            it("returns an empty string when given out-of-bounds indices", () => {
                expect(utfString.slice(3).toString()).toEqual("");
                expect(utfString.slice(3, 4).toString()).toEqual("");
            });
        });

        describe("with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");

            it("works when given start and end indices", () => {
                expect(utfString.slice(0, 1).toString()).toEqual("あ");
                expect(utfString.slice(1, 2).toString()).toEqual("り");
                expect(utfString.slice(2, 3).toString()).toEqual("が");
                expect(utfString.slice(3, 4).toString()).toEqual("と");
                expect(utfString.slice(4, 5).toString()).toEqual("う");

                expect(utfString.slice(0, 3).toString()).toEqual("ありが");
                expect(utfString.slice(1, 3).toString()).toEqual("りが");
            });

            it("works when not given an end index", () => {
                expect(utfString.slice(0).toString()).toEqual("ありがとう");
                expect(utfString.slice(1).toString()).toEqual("りがとう");
                expect(utfString.slice(2).toString()).toEqual("がとう");
                expect(utfString.slice(3).toString()).toEqual("とう");
                expect(utfString.slice(4).toString()).toEqual("う");
            });

            it("returns an empty string when given out-of-bounds indices", () => {
                expect(utfString.slice(5).toString()).toEqual("");
                expect(utfString.slice(5, 6).toString()).toEqual("");
            });
        });

        describe("with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");

            it("works when given start and end indices", () => {
                expect(utfString.slice(0, 1).toString()).toEqual("𤔣");
                expect(utfString.slice(1, 2).toString()).toEqual("𤔤");
                expect(utfString.slice(2, 3).toString()).toEqual("𤔥");
                expect(utfString.slice(3, 4).toString()).toEqual("𤔦");

                expect(utfString.slice(1, 3).toString()).toEqual("𤔤𤔥");
                expect(utfString.slice(0, 4).toString()).toEqual("𤔣𤔤𤔥𤔦");
            });

            it("works when not given an end index", () => {
                expect(utfString.slice(0).toString()).toEqual("𤔣𤔤𤔥𤔦");
                expect(utfString.slice(1).toString()).toEqual("𤔤𤔥𤔦");
                expect(utfString.slice(2).toString()).toEqual("𤔥𤔦");
                expect(utfString.slice(3).toString()).toEqual("𤔦");
            });

            it("returns an empty string when given out-of-bounds indices", () => {
                expect(utfString.slice(4).toString()).toEqual("");
                expect(utfString.slice(4, 5).toString()).toEqual("");
            });
        });
    });
});
