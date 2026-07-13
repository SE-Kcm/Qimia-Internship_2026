import Button from "./Button.js";
export default class ChangeQuantityButton extends Button {
    button;
    constructor(id, content, classNames, buttonHandler) {
        super(id, content, classNames);
        this.button = this.getElement();
        this.button.addEventListener("click", buttonHandler);
    }
}
//# sourceMappingURL=ChangeQuantityButton.js.map