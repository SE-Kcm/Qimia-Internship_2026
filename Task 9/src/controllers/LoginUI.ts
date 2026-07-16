export default class LoginUI {
    openLoginOptions(optionName: string, activeButton: HTMLButtonElement) {
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
}
