import { ReduceTextPipe } from "./reduce-text.pipe"

describe("use of reduceTextPipe", () => {
    let pipe: ReduceTextPipe;
    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it("should pipe be created", () => {
        expect(pipe).toBeTruthy();
    })

    it("should pipe transform dat", () => {
        const text: string = "abcdefghijklm"
        const newText = pipe.transform(text, 6);
        expect(newText).toEqual("abcdef");
    })
})