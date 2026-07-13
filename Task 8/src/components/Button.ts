export default class Button {
    private btn: HTMLButtonElement;
    constructor(id: string, content: string, classNames: string[]) {
        this.btn = document.createElement("button");
        this.btn.textContent = content;
        this.btn.id = id;
        classNames.forEach((element) => {
            this.btn.classList.add(element);
        });
    }

    getElement(): HTMLButtonElement {
        return this.btn;
    }
}
