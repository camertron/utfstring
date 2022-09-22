import { expect } from "expect";
import { UtfString } from "../../../src/utf_string";

describe("UtfString", () => {
    describe("#split (non-static)", () => {
        it("returns an UtfString array with a length of 3", () => {
            const utfString = new UtfString("abc");
            const result = utfString.split("");
            expect(result.length).toBe(3);
            for (const resultString of result) {
                expect(resultString).toBeInstanceOf(UtfString);
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

            it("works with limit", () => {
                const utfString = new UtfString("abcde");
                const result = utfString.split("", 3);
                expect(result.length).toBe(3);
                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with , as seperator", () => {
                const utfString = new UtfString("a,b,c");
                const result = utfString.split(",");
                expect(result.length).toBe(3);
                expect(result[0].toString()).toBe("a");
                expect(result[1].toString()).toBe("b");
                expect(result[2].toString()).toBe("c");
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

            it("works with limit", () => {
                const utfString = new UtfString("ありがとう");
                const result = utfString.split("", 3);
                expect(result.length).toBe(3);
                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with multi-byte characters as seperator", () => {
                const utfString = new UtfString("ありが");
                const result = utfString.split("り");
                expect(result.length).toBe(2);
                expect(result[0].toString()).toBe("あ");
                expect(result[1].toString()).toBe("が");
            });

            it("works with , as seperator", () => {
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

            it("works with limit", () => {
                const utfString = new UtfString("𤔣𤔤𤔥𤔦");
                const result = utfString.split("", 3);
                expect(result.length).toBe(3);
                for (let i = 0; i < result.length; i++) {
                    expect(result[i].toString()).toBe(utfString.charAt(i).toString());
                }
            });

            it("works with , as seperator", () => {
                const utfString = new UtfString("𤔣,𤔤,𤔥");
                const result = utfString.split(",");
                expect(result.length).toBe(3);
                expect(result[0].toString()).toBe("𤔣");
                expect(result[1].toString()).toBe("𤔤");
                expect(result[2].toString()).toBe("𤔥");
            });

            it("works with astral plane unicode characters as seperator", () => {
                const utfString = new UtfString("𤔣𤔤𤔥");
                const result = utfString.split("𤔤");
                expect(result.length).toBe(2);
                expect(result[0].toString()).toBe("𤔣");
                expect(result[1].toString()).toBe("𤔥");
            });
        });
    });
});
