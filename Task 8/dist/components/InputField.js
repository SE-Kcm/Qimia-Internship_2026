export default class InputField {
    input;
    constructor(type, value, id, classNames) {
        this.input = document.createElement("input");
        this.input.id = id;
        this.input.type = type;
        this.input.value = String(value);
        classNames.forEach((element) => {
            this.input.classList.add(element);
        });
    }
    getElement() {
        return this.input;
    }
}
//# sourceMappingURL=InputField.js.map