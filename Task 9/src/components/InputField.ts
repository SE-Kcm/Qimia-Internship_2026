export type InputType = "text" | "search" | "email" | "password" | "number" | "submit" | "tel";

export default class InputField {
    private input: HTMLInputElement;
    constructor(type: InputType, value: string | number, id: string, classNames: string[]) {
        this.input = document.createElement("input");
        this.input.id = id;
        this.input.type = type;

        this.input.value = String(value);

        classNames.forEach((element) => {
            this.input.classList.add(element);
        });
    }

    getElement(): HTMLInputElement {
        return this.input;
    }
}
