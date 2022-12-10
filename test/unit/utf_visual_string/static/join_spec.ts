import expect from "expect";
import { UtfVisualString } from "../../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#join (static)", () => {
        it("returns a UtfVisualString object", () => {
            const arr = ["a", "b", "c"];
            expect(UtfVisualString.join(arr)).toBeInstanceOf(UtfVisualString);
        });
    });
});
