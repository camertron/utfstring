import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#slice", () => {
        describe("with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");

            it("works when given start and end indices", () => {
                expect(utfString.slice(0, 1).toString()).toEqual("🇸🇴");
                expect(utfString.slice(1, 2).toString()).toEqual("🇫🇷");
            });

            it("works when not given an end index", () => {
                expect(utfString.slice(0).toString()).toEqual("🇸🇴🇫🇷");
                expect(utfString.slice(1).toString()).toEqual("🇫🇷");
            });

            it("returns an empty string when given out-of-bounds indices", () => {
                expect(utfString.slice(4).toString()).toEqual("");
                expect(utfString.slice(4, 5).toString()).toEqual("");
            });
        });
    });
});

