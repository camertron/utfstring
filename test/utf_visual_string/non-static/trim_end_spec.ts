import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#trimEnd", () => {
        it("returns an object of type UtfVisualString", () => {
            const utfString = new UtfVisualString(" abc");
            expect(utfString.trimEnd()).toBeInstanceOf(UtfVisualString);
        });
    });
});
