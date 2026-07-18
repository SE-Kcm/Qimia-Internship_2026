export default class LoginUI {
    openLoginOptions(optionName, activeButton) {
        const tabContents = document.getElementsByClassName("tabcontent");
        for (const tab of tabContents) {
            tab.classList.add("hidden");
        }
        // Active-Klasse von allen Buttons entfernen
        const tabLinks = document.getElementsByClassName("tablinks");
        for (const tabLink of tabLinks) {
            tabLink.classList.replace("border-b-blue-800", "border-b-gray-400");
        }
        // Gewählten Tab anzeigen
        const selectedTab = document.getElementById(optionName);
        if (selectedTab) {
            selectedTab.classList.remove("hidden");
        }
        activeButton.classList.replace("border-b-gray-400", "border-b-blue-800");
    }
    showSecondPage() {
        const page1 = document.getElementById("step1");
        const page2 = document.getElementById("step2");
        if (page1) {
            page1.classList.add("hidden");
        }
        if (page2) {
            page2.classList.remove("hidden");
        }
    }
    addErrorMessage(tab, errorField, message) {
        if (errorField === "email") {
            const element = document.getElementById("emailError");
            if (element) {
                element.textContent = message;
            }
        }
        else if (errorField === "phoneNumber") {
            const element = document.getElementById("phoneError");
            if (element) {
                element.textContent = message;
            }
        }
        else if (errorField === "password") {
            let element;
            if (tab === "email") {
                element = document.getElementById("passwordErrorEmail");
            }
            else {
                element = document.getElementById("passwordErrorPhone");
            }
            if (element) {
                element.textContent = message;
            }
        }
        else if (errorField === "general") {
            let element;
            if (tab === "email") {
                element = document.getElementById("generalErrorEmail");
            }
            else {
                element = document.getElementById("generalErrorPhone");
            }
            if (element) {
                element.textContent = message;
            }
        }
    }
    removeErrorMessage(tab, errorField) {
        if (errorField === "specific") {
            const emailError = document.getElementById("emailError");
            if (emailError) {
                emailError.textContent = "";
            }
            let passwordError;
            if (tab === "email") {
                passwordError = document.getElementById("passwordErrorEmail");
            }
            else {
                passwordError = document.getElementById("passwordErrorPhone");
            }
            if (passwordError) {
                passwordError.textContent = "";
            }
        }
        else if (errorField === "general") {
            let generalError;
            if (tab === "email") {
                generalError = document.getElementById("generalErrorEmail");
            }
            else {
                generalError = document.getElementById("generalErrorPhone");
            }
            if (generalError) {
                generalError.textContent = "";
            }
        }
    }
}
//# sourceMappingURL=LoginUI.js.map