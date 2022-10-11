import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#fromBytes", () => {
        it("returns an object of type UtfVisualString", () => {
            expect(UtfVisualString.fromBytes([97])).toBeInstanceOf(UtfVisualString);
        });
    });
});
