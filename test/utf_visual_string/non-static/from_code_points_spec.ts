import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#fromCodePoints", () => {
        it("returns an object of type UtfVisualString", () => {
            expect(UtfVisualString.fromCodePoints([97])).toBeInstanceOf(UtfVisualString);
        });
    });
});
