import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#padStart", () => {
        it("returns an object of type UtfVisualString", () => {
            const utfString = new UtfVisualString("abc");
            expect(utfString.padStart(6, "d")).toBeInstanceOf(UtfVisualString);
        });
    });
});
