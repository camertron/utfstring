import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#fromCharCode", () => {
        it("returns an object of type UtfVisualString", () => {
            const utfString = UtfVisualString.fromCharCode(97);
            expect(utfString).toBeInstanceOf(UtfVisualString);
        });
    });
});

