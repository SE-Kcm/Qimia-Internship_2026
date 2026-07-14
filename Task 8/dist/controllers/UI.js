export default class UI {
    createDiv(divName, id) {
        const div = document.createElement("div");
        div.classList.add(divName);
        div.id = divName + id;
        return div;
    }
    createArticle(articleName, id) {
        const article = document.createElement("article");
        article.classList.add(articleName);
        article.id = articleName + id;
        return article;
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
    // createInput(content: number, className: string, id: number, inputHandler: (val: number) => void): HTMLInputElement {
    //     const input = document.createElement("input");
    //     input.type = "number";
    //     input.valueAsNumber = content;
    //     input.classList.add(className);
    //     input.id = className + id;
    //     input.min = "0";
    //     input.addEventListener("keydown", (event) => {
    //         if (event.key === "Enter") {
    //             input.blur();
    //         }
    //     });
    //     input.addEventListener("blur", () => {
    //         inputHandler(Number(input.value));
    //     });
    //     return input;
    // }
    // createButton(content: string, className: string, id: string, buttonHandler: () => void): HTMLButtonElement {
    //     const btn = document.createElement("button");
    //     btn.classList.add(className);
    //     btn.textContent = content;
    //     btn.id = id;
    //     btn.addEventListener("click", buttonHandler);
    //     return btn;
    // }
    updateQuantity(id, newContent) {
        const element = document.getElementById("quantity" + id);
        if (element instanceof HTMLInputElement) {
            element.value = newContent.toString();
        }
    }
    updateTotal(id, newContent) {
        const element = document.getElementById("totalValue" + id);
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
        const box = document.getElementById("productBox" + id);
        if (box) {
            box.remove();
        }
    }
    // createSpinner(id: number): SVGSVGElement {
    //     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //     svg.setAttribute("viewBox", "0 0 64 64");
    //     svg.setAttribute("fill", "none");
    //     svg.setAttribute("width", "24");
    //     svg.setAttribute("height", "24");
    //     svg.setAttribute("id", "spinner" + id);
    //     svg.classList.add("hidden");
    //     const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //     path1.setAttribute(
    //         "d",
    //         "M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z",
    //     );
    //     path1.setAttribute("stroke", "black");
    //     path1.setAttribute("stroke-width", "5");
    //     path1.setAttribute("stroke-linecap", "round");
    //     path1.setAttribute("stroke-linejoin", "round");
    //     const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //     path2.setAttribute(
    //         "d",
    //         "M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762",
    //     );
    //     path2.setAttribute("stroke", "black");
    //     path2.setAttribute("stroke-width", "5");
    //     path2.setAttribute("stroke-linecap", "round");
    //     path2.setAttribute("stroke-linejoin", "round");
    //     path2.classList.add("text-gray-900");
    //     svg.append(path1, path2);
    //     return svg;
    // }
    createSpinner(id) {
        const div = document.createElement("div");
        div.classList.add("spinner");
        div.classList.add("hidden");
        div.id = "spinner" + id;
        return div;
    }
    showLoader(id) {
        const element = document.getElementById("total" + id);
        if (element) {
            element.classList.add("hidden");
        }
        const loader = document.getElementById("spinner" + id);
        if (loader) {
            loader.classList.remove("hidden");
        }
    }
    hideLoader(id) {
        const element = document.getElementById("total" + id);
        if (element) {
            element.classList.remove("hidden");
        }
        const loader = document.getElementById("spinner" + id);
        if (loader) {
            loader.classList.add("hidden");
        }
    }
    toggle(toggle) {
        if (toggle) {
            const emptyBox = document.getElementById("emptyCart");
            if (emptyBox) {
                emptyBox.classList.remove("hidden");
                const header = document.getElementById("columnNames");
                if (header) {
                    header.classList.add("lg:hidden");
                }
            }
        }
        else {
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
//# sourceMappingURL=UI.js.map