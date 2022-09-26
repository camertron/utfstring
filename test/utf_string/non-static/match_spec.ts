import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#match", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.match("a")).toBeInstanceOf(Array<UtfString>);
        });

        it("returns null if no match is found", () => {
            const utfString = new UtfString("abc");
            expect(utfString.match("x")).toBeNull();
        });

        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abca");
            const matchResult = utfString.match("a");

            expect(matchResult?.length).toBe(1);

            if (matchResult) {
                expect(matchResult[0]).toEqual("a");
            }
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう");
            const matchResult = utfString.match("あ");

            expect(matchResult?.length).toBe(1);

            if (matchResult) {
                expect(matchResult[0]).toEqual("あ");
            }
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔤𤔣𤔥𤔦");
            const matchResult = utfString.match("𤔣");

            expect(matchResult?.length).toBe(1);

            if (matchResult) {
                expect(matchResult[0]).toEqual("𤔣");
            }
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            const matchResult = utfString.match(new UtfString("a"));

            expect(matchResult?.length).toBe(1);

            if (matchResult) {
                expect(matchResult[0]).toEqual("a");
            }
        });

        it("works with a regular expression parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.match(/[a-c]/g)).toEqual(["a", "b", "c"]);
        });

        it("works with an object parameter that has a match method", () => {
            const utfString = new UtfString("abc");
            expect(utfString.match({ [Symbol.match]: (str) => str.match(/\w/g) })).toEqual(["a", "b", "c"]);
        });
    });
});
