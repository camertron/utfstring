import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#concat", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat("d")).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat("d") === utfString).toBeFalsy();
        });

        it("works with a normal string", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat("d").toString()).toEqual("abcd");
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat(new UtfString("d")).toString()).toEqual("abcd");
        });

        it("works with multiple normal strings", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat("d", "e", "f").toString()).toEqual("abcdef");
        });

        it("works with multiple UtfString parameters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat(new UtfString("d"), new UtfString("e"), new UtfString("f")).toString()).toEqual(
                "abcdef"
            );
        });

        it("works with no parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat().toString()).toEqual("abc");
        });

        it("works with a mixture of normal and UtfString parameters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.concat("d", new UtfString("e"), "f").toString()).toEqual("abcdef");
        });
    });
});

