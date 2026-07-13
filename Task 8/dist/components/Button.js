export default class Button {
    btn;
    constructor(id, content, classNames) {
        this.btn = document.createElement("button");
        this.btn.textContent = content;
        this.btn.id = id;
        classNames.forEach((element) => {
            this.btn.classList.add(element);
        });
    }
    getElement() {
        return this.btn;
    }
}
//# sourceMappingURL=Button.js.map