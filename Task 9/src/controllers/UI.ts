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

    createSpinner(id: number): HTMLElement {
        const div = document.createElement("div");
        div.classList.add("spinner");
        div.id = "spinner" + id;
        return div;
    }

    showLoader(id: number): void {
        const element = document.getElementById("total" + id);
        if (element) {
            element.classList.add("hidden");
        }
        const loader = document.getElementById("spinner" + id);
        if (loader) {
            loader.classList.remove("hidden");
        }
    }

    hideLoader(id: number): void {
        const element = document.getElementById("total" + id);
        if (element) {
            element.classList.remove("hidden");
        }
        const loader = document.getElementById("spinner" + id);
        if (loader) {
            loader.classList.add("hidden");
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
