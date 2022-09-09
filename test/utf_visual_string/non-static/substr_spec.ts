import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#substr", () => {
        it("returns an object of type UtfVisualString", () => {
            const utfString = new UtfVisualString("abc");
            expect(utfString.substr(0, 1)).toBeInstanceOf(UtfVisualString);
        });

        describe("with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");

            it("works when given a start and a length", () => {
                expect(utfString.substr(0, 1).toString()).toEqual("🇸🇴");
                expect(utfString.substr(1, 1).toString()).toEqual("🇫🇷");
            });

            it("works when not given a length", () => {
                expect(utfString.substr(0).toString()).toEqual("🇸🇴🇫🇷");
                expect(utfString.substr(1).toString()).toEqual("🇫🇷");
            });

            it("returns an empty string if given an out-of-bounds start", () => {
                expect(utfString.substr(4, 1).toString()).toEqual("");
            });

            it("returns up to the length of the string if given an out-of-bounds length", () => {
                expect(utfString.substr(1, 10).toString()).toEqual("🇫🇷");
            });

            it("accepts a negative start value", () => {
                expect(utfString.substr(-1, 1).toString()).toEqual("🇫🇷");
                expect(utfString.substr(-2, 1).toString()).toEqual("🇸🇴");
            });

            it("returns an empty string if the negative start value is out-of-bounds", () => {
                expect(utfString.substr(-3, 1).toString()).toEqual("");
            });
        });
    });
});

