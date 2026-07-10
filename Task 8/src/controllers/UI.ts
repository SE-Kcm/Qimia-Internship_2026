export default class UI {
    createDiv(divName: string, id: number): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add(divName);
        div.id = divName + id;
        return div;
    }

    createArticle(articleName: string, id: number): HTMLElement {
        const article = document.createElement("article");
        article.classList.add(articleName);
        article.id = articleName + id;
        return article;
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

    createInput(content: string, className: string, id: number, inputHandler: (val: number) => void): HTMLInputElement {
        const input = document.createElement("input");
        input.value = content;
        input.classList.add(className);
        input.id = className + id;
        input.min = "0";

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                input.blur();
            }
        });
        input.addEventListener("blur", (event) => {
            if (Number(input.value) < 0 || isNaN(Number(input.value))) {
                alert("Please enter a valid Input!");
                return;
            }
            inputHandler(Number(input.value));
        });
        return input;
    }

    createButton(content: string, className: string, id: string, buttonHandler: () => void): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.classList.add(className);
        btn.textContent = content;
        btn.id = id;
        btn.addEventListener("click", buttonHandler);

        return btn;
    }

    updateQuantity(id: number, newContent: number): void {
        const element = document.getElementById("quantity" + id);
        if (element instanceof HTMLInputElement) {
            element.value = newContent.toString();
        }
    }

    updateTotal(id: number, newContent: string): void {
        const element = document.getElementById("totalValue" + id);
        if (element) {
            element.textContent = newContent + "$";
        }
    }
    updateCartSubTotal(newTotal: number): void {
        const element = document.getElementById("subtotalPrice");
        if (element) {
            element.textContent = newTotal.toFixed(2) + "$";
        }
    }

    updateCartTotal(newTotal: number): void {
        const element = document.getElementById("totalCart");
        if (element) {
            element.textContent = newTotal.toFixed(2) + "$";
        }
    }

    updateCartQuantity(quantity: number): void {
        const element = document.getElementById("item-count");
        if (element) {
            element.textContent = "(" + quantity.toString() + " adet)";
        }
    }

    deleteProductBox(id: number): void {
        const box = document.getElementById("productBox" + id);
        if (box) {
            box.remove();
        }
    }

    toggle(toggle: boolean) {
        if (toggle) {
            const emptyBox = document.getElementById("emptyCart");
            if (emptyBox) {
                emptyBox.classList.remove("hidden");
                const header = document.getElementById("columnNames");
                if (header) {
                    header.classList.add("lg:hidden");
                }
            }
        } else {
            const emptyBox = document.getElementById("emptyCart");
            if (emptyBox) {
                emptyBox.classList.add("hidden");
                const header = document.getElementById("columnNames");
                if (header) {
                    header.classList.remove("lg:hidden");
                }
            }
        }
    }
}
