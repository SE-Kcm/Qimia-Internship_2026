export default class UI {
    createDiv(divName, id) {
        const div = document.createElement("div");
        div.classList.add(divName);
        div.id = divName + id;
        return div;
    }
    createH2(text) {
        const h2 = document.createElement("h2");
        h2.textContent = text;
        return h2;
    }
    createH3(text) {
        const h3 = document.createElement("h3");
        h3.textContent = "Total: " + text + "$";
        return h3;
    }
    createH4(text) {
        const h4 = document.createElement("h4");
        h4.textContent = text + "$";
        return h4;
    }
    createH5(text) {
        const h5 = document.createElement("h5");
        h5.textContent = text;
        return h5;
    }
    createProductImage(srcUrl) {
        const img = document.createElement("img");
        img.src = srcUrl;
        return img;
    }
    createButton(content, className, id, buttonHandler) {
        const btn = document.createElement("button");
        btn.classList.add(className);
        btn.textContent = content;
        btn.id = id;
        btn.addEventListener("click", buttonHandler);
        return btn;
    }
    destroyButton(btn, buttonHandler) {
        btn.removeEventListener("click", buttonHandler);
    }
    updateQuantity(id, newContent) {
        const element = document.getElementById("quantity" + id);
        const h5 = element?.querySelector("h5");
        h5.textContent = newContent.toString();
        console.log("update:", id);
    }
    updateTotal(id, newContent) {
        const element = document.getElementById("productBox" + id);
        const h3 = element?.querySelector("h3");
        h3.textContent = "Total: " + newContent + "$";
    }
    updateCartTotal(newTotal) {
        const element = document.getElementById("checkout");
        element?.querySelector("h2");
        element.textContent = "TOTAL: " + newTotal.toFixed(2) + "$";
    }
    deleteProductBox(id) {
        document.getElementById("productBox" + id)?.remove();
    }
}
//# sourceMappingURL=UI.js.map