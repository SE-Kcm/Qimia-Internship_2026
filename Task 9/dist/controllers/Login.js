import UI from "./LoginUI.js";
export default class Login {
    ui;
    constructor() {
        this.ui = new UI();
    }
    init() {
        console.log("init");
        const emailTab = document.getElementById("emailTab");
        const phoneTab = document.getElementById("phoneTab");
        emailTab.addEventListener("click", () => {
            console.log("click");
            this.ui.openLoginOptions("E-Mail", emailTab);
        });
        phoneTab.addEventListener("click", () => {
            this.ui.openLoginOptions("Phone", phoneTab);
        });
    }
}
//# sourceMappingURL=Login.js.map