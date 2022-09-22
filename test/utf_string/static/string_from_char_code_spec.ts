import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#stringFromCharCode (static)", () => {
        it("works with standard ASCII characters", () => {
            expect(UtfString.stringFromCharCode(97)).toEqual("a");
            expect(UtfString.stringFromCharCode(98)).toEqual("b");
            expect(UtfString.stringFromCharCode(99)).toEqual("c");
        });

        it("works with multi-byte characters", () => {
            expect(UtfString.stringFromCharCode(12354)).toEqual("あ");
            expect(UtfString.stringFromCharCode(12426)).toEqual("り");
            expect(UtfString.stringFromCharCode(12364)).toEqual("が");
            expect(UtfString.stringFromCharCode(12392)).toEqual("と");
            expect(UtfString.stringFromCharCode(12358)).toEqual("う");
        });

        it("works with astral plane unicode characters", () => {
            expect(UtfString.stringFromCharCode(148771)).toEqual("𤔣");
        });

        it("works with regional indicators", () => {
            expect(UtfString.stringFromCharCode(127467)).toEqual("🇫");
        });
    });
});
