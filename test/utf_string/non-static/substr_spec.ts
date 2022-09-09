import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#substr", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.substr(0, 1)).toBeInstanceOf(UtfString);
        });

        describe("with standard ASCII characters", () => {
            const utfString = new UtfString("abc");

            it("works when given a start and a length", () => {
                expect(utfString.substr(0, 1).toString()).toEqual("a");
                expect(utfString.substr(1, 1).toString()).toEqual("b");
                expect(utfString.substr(2, 1).toString()).toEqual("c");
            });

            it("works when not given a length", () => {
                expect(utfString.substr(0).toString()).toEqual("abc");
                expect(utfString.substr(1).toString()).toEqual("bc");
                expect(utfString.substr(2).toString()).toEqual("c");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(utfString.substr(3, 1).toString()).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(utfString.substr(2, 10).toString()).toEqual("c");
            });

            it("accepts a negative start value", () => {
                expect(utfString.substr(-1, 1).toString()).toEqual("c");
                expect(utfString.substr(-2, 1).toString()).toEqual("b");
                expect(utfString.substr(-3, 1).toString()).toEqual("a");
            });

            it("returns an empty string if the negative start value is out-of-bounds", () => {
                expect(utfString.substr(-4, 1).toString()).toEqual("");
            });
        });

        describe("with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");

            it("works when given a start and a length", () => {
                expect(utfString.substr(0, 1).toString()).toEqual("あ");
                expect(utfString.substr(1, 1).toString()).toEqual("り");
                expect(utfString.substr(2, 1).toString()).toEqual("が");
                expect(utfString.substr(3, 1).toString()).toEqual("と");
                expect(utfString.substr(4, 1).toString()).toEqual("う");
            });

            it("works when not given a length", () => {
                expect(utfString.substr(0).toString()).toEqual("ありがとう");
                expect(utfString.substr(1).toString()).toEqual("りがとう");
                expect(utfString.substr(2).toString()).toEqual("がとう");
                expect(utfString.substr(3).toString()).toEqual("とう");
                expect(utfString.substr(4).toString()).toEqual("う");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(utfString.substr(5, 1).toString()).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(utfString.substr(2, 10).toString()).toEqual("がとう");
            });

            it("accepts a negative start value", () => {
                expect(utfString.substr(-1, 1).toString()).toEqual("う");
                expect(utfString.substr(-2, 1).toString()).toEqual("と");
                expect(utfString.substr(-3, 1).toString()).toEqual("が");
                expect(utfString.substr(-4, 1).toString()).toEqual("り");
                expect(utfString.substr(-5, 1).toString()).toEqual("あ");
            });

            it("returns an empty string if the negative start value is out-of-bounds", () => {
                expect(utfString.substr(-6, 1).toString()).toEqual("");
            });
        });

        describe("with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");

            it("works when given a start and a length", () => {
                expect(utfString.substr(0, 1).toString()).toEqual("𤔣");
                expect(utfString.substr(1, 1).toString()).toEqual("𤔤");
                expect(utfString.substr(2, 1).toString()).toEqual("𤔥");
                expect(utfString.substr(3, 1).toString()).toEqual("𤔦");
            });

            it("works when not given a length", () => {
                expect(utfString.substr(0).toString()).toEqual("𤔣𤔤𤔥𤔦");
                expect(utfString.substr(1).toString()).toEqual("𤔤𤔥𤔦");
                expect(utfString.substr(2).toString()).toEqual("𤔥𤔦");
                expect(utfString.substr(3).toString()).toEqual("𤔦");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(utfString.substr(4, 1).toString()).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(utfString.substr(2, 10).toString()).toEqual("𤔥𤔦");
            });

            it("accepts a negative start value", () => {
                expect(utfString.substr(-1, 1).toString()).toEqual("𤔦");
                expect(utfString.substr(-2, 1).toString()).toEqual("𤔥");
                expect(utfString.substr(-3, 1).toString()).toEqual("𤔤");
                expect(utfString.substr(-4, 1).toString()).toEqual("𤔣");
            });

            it("returns an empty string if the negative start value is out-of-bounds", () => {
                expect(utfString.substr(-5, 1).toString()).toEqual("");
            });
        });
    });
});

