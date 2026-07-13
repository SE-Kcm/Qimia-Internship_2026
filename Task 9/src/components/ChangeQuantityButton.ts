import Button from "./Button.js";

export default class ChangeQuantityButton extends Button {
    button: HTMLButtonElement;
    constructor(id: string, content: string, classNames: string[], buttonHandler: () => void) {
        super(id, content, classNames);
        this.button = this.getElement();
        this.button.addEventListener("click", buttonHandler);
    }
}
