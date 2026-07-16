import UI from "./LoginUI.js";

export default class Login {
    ui: UI;
    constructor() {
        this.ui = new UI();
    }
    init() {
        console.log("init");
        const emailTab = document.getElementById("emailTab") as HTMLButtonElement;
        const phoneTab = document.getElementById("phoneTab") as HTMLButtonElement;

        emailTab.addEventListener("click", () => {
            console.log("click");
            this.ui.openLoginOptions("E-Mail", emailTab);
        });

        phoneTab.addEventListener("click", () => {
            this.ui.openLoginOptions("Phone", phoneTab);
        });
    }
}
