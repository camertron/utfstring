import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#charAt", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.charAt(0)).toEqual("a");
            expect(utfString.charAt(1)).toEqual("b");
            expect(utfString.charAt(2)).toEqual("c");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう"); // "arigatou"
            expect(utfString.charAt(0)).toEqual("あ"); // "a"
            expect(utfString.charAt(1)).toEqual("り"); // "ri"
            expect(utfString.charAt(2)).toEqual("が"); // "ga"
            expect(utfString.charAt(3)).toEqual("と"); // "to"
            expect(utfString.charAt(4)).toEqual("う"); // "u"
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expect(utfString.charAt(0)).toEqual("𤔣");
            expect(utfString.charAt(1)).toEqual("𤔤");
            expect(utfString.charAt(2)).toEqual("𤔥");
            expect(utfString.charAt(3)).toEqual("𤔦");
        });

        it("returns an empty string for indices that are out of range", () => {
            const utfString = new UtfString("abc");
            expect(utfString.charAt(3)).toEqual("");
        });
    });
});

