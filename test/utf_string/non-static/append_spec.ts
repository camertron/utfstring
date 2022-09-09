import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#append", () => {
        it("returns an object of type UtfString", () => {
            const utfString = new UtfString("abc");
            expect(utfString.append("d")).toBeInstanceOf(UtfString);
        });

        it("returns a new object", () => {
            const utfString = new UtfString("abc");
            expect(utfString.append("d")).not.toEqual(utfString);
        });

        it("works with a normal string", () => {
            const utfString = new UtfString("abc");
            expect(utfString.append("d").toString()).toEqual("abcd");
        });

        it("works with a UtfString parameter", () => {
            const utfString = new UtfString("abc");
            expect(utfString.append(new UtfString("d")).toString()).toBeTruthy();
        });
    });
});

