export default class UI {
    createDiv(divName: string, id: number): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add(divName);
        div.id = divName + id;
        return div;
    }

    createP(content: string, className: string, id: number): HTMLParagraphElement {
        const p = document.createElement("p");
        p.textContent = content;
        p.classList.add(className);
        p.id = className + id;
        return p;
    }

    createSpan(content: string, className: string, id: number): HTMLSpanElement {
        const span = document.createElement("span");
        span.textContent = content;
        span.classList.add(className);
        span.id = className + id;
        return span;
    }

    createImage(srcUrl: string): HTMLImageElement {
        const img = document.createElement("img");
        img.src = srcUrl;
        return img;
    }

    // createInput(content: string, className: string, id: number): HTMLInputElement {
    //     const input = document.createElement("input");
    //     input.value = content;
    //     input.classList.add(className);
    //     input.id = className + id;
    //     input.addEventListener("click", (event) => {
    //         this.updateQuantity(id, Number((event.target as HTMLInputElement).value));
    //     });
    //     return input;
    // }

    createButton(content: string, className: string, id: string, buttonHandler: () => void): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.classList.add(className);
        btn.textContent = content;
        btn.id = id;
        btn.addEventListener("click", buttonHandler);

        return btn;
    }

    updateQuantity(id: number, newContent: number) {
        const element = document.getElementById("quantity" + id);
        if (element) {
            element.textContent = newContent.toString();
        }
    }

    updateTotal(id: number, newContent: string) {
        const element = document.getElementById("total" + id);
        if (element) {
            element.textContent = newContent + "$";
        }
    }
    updateCartSubTotal(newTotal: number) {
        const element = document.getElementById("subtotalPrice");
        if (element) {
            element.textContent = newTotal.toFixed(2) + "$";
        }
    }

    updateCartTotal(newTotal: number) {
        // const element = document.getElementById("checkout");
        // element?.querySelector("h2");
        // element!.textContent = "TOTAL: " + newTotal.toFixed(2) + "$";
        const element = document.getElementById("totalCart");
        if (element) {
            element.textContent = newTotal.toFixed(2) + "$";
        }
    }

    updateCartQuantity(quantity: number) {
        const element = document.getElementById("item-count");
        if (element) {
            element.textContent = "(" + quantity.toString() + " adet)";
        }
    }

    deleteProductBox(id: number) {
        document.getElementById("productBox" + id)?.remove();
    }
}
