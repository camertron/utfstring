import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#equals", () => {
        it("matches with an equal normal string", () => {
            const utfString = new UtfString("abc");
            expect(utfString.equals("abc")).toBeTruthy();
        });

        it("doesn't match with a different normal string", () => {
            const utfString = new UtfString("abc");
            expect(utfString.equals("abcd")).toBeFalsy();
        });

        it("matches with an equal UtfString object", () => {
            const utfString1 = new UtfString("ありがとう");
            const utfString2 = new UtfString("ありがとう");
            expect(utfString1.equals(utfString2)).toBeTruthy();
        });

        it("doesn't match with a different UtfString object", () => {
            const utfString1 = new UtfString("ありがとう");
            const utfString2 = new UtfString("abcd");
            expect(utfString1.equals(utfString2)).toBeFalsy();
        });
    });
});

