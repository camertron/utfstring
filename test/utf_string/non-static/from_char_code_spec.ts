import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#fromCharCode", () => {
        it("returns an object of type UtfString", () => {
            const utfString = UtfString.fromCharCode(97);
            expect(utfString).toBeInstanceOf(UtfString);
        });

        it("works with standard ASCII characters", () => {
            const utfString = UtfString.fromCharCode(97);
            expect(utfString.toString()).toEqual("a");
        });

        it("works with multi-byte characters", () => {
            const utfString = UtfString.fromCharCode(12354);
            expect(utfString.toString()).toEqual("あ");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = UtfString.fromCharCode(148771);
            expect(utfString.toString()).toEqual("𤔣");
        });

        it("works with regional indicators", () => {
            const utfString = UtfString.fromCharCode(127467);
            expect(utfString.toString()).toEqual("🇫");
        });
    });
});
