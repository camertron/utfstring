import expect from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#Symbol.iterator", () => {
        /**
         * Checks if the UTF string object's iterator returns all the characters in the given array.
         * @param utfString The UTF string object that is iterated.
         * @param chars The characters that are to be returned by the iterator.
         */
        function expectIteratedCharsToBe(utfString: UtfString, ...chars: string[]): void {
            let charCounter = 0;

            for (const utfChar of utfString) {
                expect(utfChar.toString()).toEqual(chars[charCounter]);
                ++charCounter;
            }
            expect(charCounter).toEqual(chars.length);
        }

        it("works with standard ASCII characters", () => {
            const utfString = new UtfString("abc");
            expectIteratedCharsToBe(utfString, "a", "b", "c");
        });

        it("works with multi-byte characters", () => {
            const utfString = new UtfString("ありがとう"); // "arigatou"
            expectIteratedCharsToBe(utfString, "あ", "り", "が", "と", "う");
        });

        it("works with astral plane unicode characters", () => {
            const utfString = new UtfString("𤔣𤔤𤔥𤔦");
            expectIteratedCharsToBe(utfString, "𤔣", "𤔤", "𤔥", "𤔦");
        });

        it("doesn't pair regional indicators", () => {
            const utfString = new UtfString("🇸🇴🇫🇷");
            expectIteratedCharsToBe(utfString, "🇸", "🇴", "🇫", "🇷");
        });
    });
});

