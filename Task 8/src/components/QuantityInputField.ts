import InputField from "./InputField.js";

export default class QuantityInputField extends InputField {
    inpt: HTMLInputElement;
    constructor(value: number, id: string, inputHandler: (val: number) => void) {
        super("number", value, id, []);
        this.inpt = this.getElement();
        this.inpt.min = "0";

        this.inpt.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.inpt.blur();
            }
        });
        this.inpt.addEventListener("blur", () => {
            const value = this.inpt.valueAsNumber;
            if (!isNaN(value)) {
                inputHandler(value);
            }
        });
    }
}
