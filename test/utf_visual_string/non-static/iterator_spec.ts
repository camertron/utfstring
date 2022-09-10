import expect from "expect";
import { UtfVisualString } from "../../../src/utf_visual_string";

describe("UtfVisualString", () => {
    describe("#Symbol.iterator", () => {
        /**
         * Checks if the UTF string object's iterator returns all the characters in the given array.
         * @param utfString The UTF string object that is iterated.
         * @param chars The characters that are to be returned by the iterator.
         */
        function expectIteratedCharsToBe(utfString: UtfVisualString, ...chars: string[]): void {
            let charCounter = 0;

            for (const utfChar of utfString) {
                expect(utfChar.toString()).toEqual(chars[charCounter]);
                ++charCounter;
            }
            expect(charCounter).toEqual(chars.length);
        }

        it("works with standard ASCII characters", () => {
            const utfString = new UtfVisualString("abc");
            expectIteratedCharsToBe(utfString, "a", "b", "c");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfVisualString("ありがとう"); // "arigatou"
            expectIteratedCharsToBe(utfString, "あ", "り", "が", "と", "う");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfVisualString("𤔣𤔤𤔥𤔦");
            expectIteratedCharsToBe(utfString, "𤔣", "𤔤", "𤔥", "𤔦");
        });

        it("works with regional indicators", () => {
            const utfString = new UtfVisualString("🇸🇴🇫🇷");
            expectIteratedCharsToBe(utfString, "🇸🇴", "🇫🇷");
        });
    });
});

