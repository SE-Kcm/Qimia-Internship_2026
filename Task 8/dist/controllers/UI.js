export default class UI {
    createDiv(divName, id) {
        const div = document.createElement("div");
        div.classList.add(divName);
        div.id = divName + id;
        return div;
    }
    createP(content, className, id) {
        const p = document.createElement("p");
        p.textContent = content;
        p.classList.add(className);
        p.id = className + id;
        return p;
    }
    createSpan(content, className, id) {
        const span = document.createElement("span");
        span.textContent = content;
        span.classList.add(className);
        span.id = className + id;
        return span;
    }
    createImage(srcUrl) {
        const img = document.createElement("img");
        img.src = srcUrl;
        return img;
    }
    createInput(content, className, id) {
        const input = document.createElement("input");
        input.value = content;
        input.classList.add(className);
        input.id = className + id;
        input.addEventListener("click", (event) => {
            this.updateQuantity(id, Number(event.target.value));
        });
        return input;
    }
    createButton(content, className, id, buttonHandler) {
        const btn = document.createElement("button");
        btn.classList.add(className);
        btn.textContent = content;
        btn.id = id;
        btn.addEventListener("click", buttonHandler);
        return btn;
    }
    updateQuantity(id, newContent) {
        const element = document.getElementById("quantity" + id);
        if (element) {
            element.textContent = newContent.toString();
        }
    }
    updateTotal(id, newContent) {
        const element = document.getElementById("total" + id);
        if (element) {
            element.textContent = newContent + "$";
        }
    }
    updateCartSubTotal(newTotal) {
        const element = document.getElementById("subtotalPrice");
        if (element) {
            element.textContent = newTotal.toFixed(2) + "$";
        }
    }
    updateCartTotal(newTotal) {
        // const element = document.getElementById("checkout");
        // element?.querySelector("h2");
        // element!.textContent = "TOTAL: " + newTotal.toFixed(2) + "$";
        const element = document.getElementById("totalCart");
        if (element) {
            element.textContent = newTotal.toFixed(2) + "$";
        }
    }
    updateCartQuantity(quantity) {
        const element = document.getElementById("item-count");
        if (element) {
            element.textContent = "(" + quantity.toString() + " adet)";
        }
    }
    deleteProductBox(id) {
        document.getElementById("productBox" + id)?.remove();
    }
}
//# sourceMappingURL=UI.js.map