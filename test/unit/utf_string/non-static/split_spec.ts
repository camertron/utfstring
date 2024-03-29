import { expect } from "expect";
import { UtfString } from "../../../../src/utf_string";

describe("UtfString", () => {
    describe("#split", () => {
        it("returns an array of UtfString objects", () => {
            const utfString = new UtfString("abc");
            const result = utfString.split("");
            expect(result.length).toBe(3);

            for (const item of result) {
                expect(item).toBeInstanceOf(UtfString);
            }
        });

        describe("with standard ASCII characters", () => {
            it("works with empty string as seperator", () => {
                const utfString = new UtfString("abc");
                const result = utfString.split("");
                expect(result.length).toBe(3);

                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with a custom seperator", () => {
                const utfString = new UtfString("a,b,c");
                const result = utfString.split(",");

                expect(result.length).toBe(3);
                expect(result[0].toString()).toBe("a");
                expect(result[1].toString()).toBe("b");
                expect(result[2].toString()).toBe("c");
            });

            it("works with a regular expression as seperator", () => {
                const utfString = new UtfString("a1b2c");
                const result = utfString.split(/\d/);

                expect(result.length).toBe(3);
                expect(result[0].toString()).toBe("a");
                expect(result[1].toString()).toBe("b");
                expect(result[2].toString()).toBe("c");
            });

            it("works with an object as seperator that has a split method", () => {
                const utfString = new UtfString("a|b|c");
                const result = utfString.split({ [Symbol.split]: (str) => str.split("|") });

                expect(result.length).toBe(3);
                expect(result[0].toString()).toBe("a");
                expect(result[1].toString()).toBe("b");
                expect(result[2].toString()).toBe("c");
            });

            it("works with a limit value", () => {
                const utfString = new UtfString("abcde");
                const result = utfString.split("", 3);
                expect(result.length).toBe(3);

                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });
        });

        describe("with multi-byte characters", () => {
            it("works with empty string as seperator", () => {
                const utfString = new UtfString("ありがとう");
                const result = utfString.split("");
                expect(result.length).toBe(5);

                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with a limit value", () => {
                const utfString = new UtfString("ありがとう");
                const result = utfString.split("", 3);
                expect(result.length).toBe(3);

                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with multi-byte character as seperator", () => {
                const utfString = new UtfString("ありが");
                const result = utfString.split("り");

                expect(result.length).toBe(2);
                expect(result[0].toString()).toBe("あ");
                expect(result[1].toString()).toBe("が");
            });

            it("works with a custom seperator", () => {
                const utfString = new UtfString("あ,り,が");
                const result = utfString.split(",");

                expect(result.length).toBe(3);
                expect(result[0].toString()).toBe("あ");
                expect(result[1].toString()).toBe("り");
                expect(result[2].toString()).toBe("が");
            });
        });

        describe("with astral plane unicode characters", () => {
            it("works with empty string as seperator", () => {
                const utfString = new UtfString("𤔣𤔤𤔥𤔦");
                const result = utfString.split("");
                expect(result.length).toBe(4);

                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with a limit value", () => {
                const utfString = new UtfString("𤔣𤔤𤔥𤔦");
                const result = utfString.split("", 3);
                expect(result.length).toBe(3);

                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with a custom seperator", () => {
                const utfString = new UtfString("𤔣,𤔤,𤔥");
                const result = utfString.split(",");

                expect(result.length).toBe(3);
                expect(result[0].toString()).toBe("𤔣");
                expect(result[1].toString()).toBe("𤔤");
                expect(result[2].toString()).toBe("𤔥");
            });

            it("works with astral plane unicode character as seperator", () => {
                const utfString = new UtfString("𤔣𤔤𤔥");
                const result = utfString.split("𤔤");

                expect(result.length).toBe(2);
                expect(result[0].toString()).toBe("𤔣");
                expect(result[1].toString()).toBe("𤔥");
            });
        });
    });
});
