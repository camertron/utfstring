import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#charCodeAt", () => {
        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expect(utfString.charCodeAt(0)).toEqual(97);
            expect(utfString.charCodeAt(1)).toEqual(98);
            expect(utfString.charCodeAt(2)).toEqual(99);
            expect(utfString.charCodeAt(3)).toBeNaN();
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう"); // "arigatou"
            expect(utfString.charCodeAt(0)).toEqual(12354); // あ "a"
            expect(utfString.charCodeAt(1)).toEqual(12426); // り "ri"
            expect(utfString.charCodeAt(2)).toEqual(12364); // が "ga"
            expect(utfString.charCodeAt(3)).toEqual(12392); // と "to"
            expect(utfString.charCodeAt(4)).toEqual(12358); // う "u"
            expect(utfString.charCodeAt(5)).toBeNaN();
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("\u{24523}");
            expect(utfString.charCodeAt(0)).toEqual(148771);
            expect(utfString.charCodeAt(1)).toBeNaN();
        });

        it("works with mixed astral and non-astral plane characters", () => {
            const utfString = new UtfString("\u0001\u{1F1E6}\u0002");
            expect(utfString.charCodeAt(0)).toEqual(1);
            expect(utfString.charCodeAt(1)).toEqual(127462);
            expect(utfString.charCodeAt(2)).toEqual(2);
            expect(utfString.charCodeAt(3)).toBeNaN();
        });

        it("works with regional indicators", () => {
            const utfString = new UtfString("🇫🇷");
            expect(utfString.charCodeAt(0)).toEqual(127467);
            expect(utfString.charCodeAt(1)).toEqual(127479);
        });
    });
});

