import Skeleton from "../components/Skeleton.js";

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
        div.classList.add("hidden");
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

    async imagesLoaded(): Promise<void> {
        const images = document.querySelectorAll<HTMLImageElement>("#productList img");
        const promises: Promise<void>[] = [];
        for (const image of images) {
            const promise = new Promise<void>((resolve) => {
                if (image.complete) {
                    resolve();
                } else {
                    image.onload = () => resolve();
                }
            });
            promises.push(promise);
        }

        await Promise.allSettled(promises);
    }

    createSkeleton(amount: number) {
        const skeleton = document.getElementById("skeleton");
        if (skeleton) {
            for (let i = 0; i < amount; i++) {
                const skeletnBox = document.createElement("article");
                skeletnBox.classList.add("productBox", "bg-transparent");

                const imageBox = document.createElement("div");
                imageBox.classList.add("imageBox", "h-20");
                const skeletonImage = new Skeleton().create("w-full", "h-full");
                imageBox.appendChild(skeletonImage);

                const details = document.createElement("div");
                details.classList.add("productDetails");
                const skeletonTitle = new Skeleton().create("w-3/4", "h-4");
                const skeletonPrice = new Skeleton().create("w-3/4", "h-4");

                const quantityBox = document.createElement("div");
                quantityBox.classList.add("quantityBox");
                const skeletonDecreaseButton = new Skeleton().create("w-7", "h-7");
                const skeletonInput = new Skeleton().create("w-7", "h-7");
                const skeletonIncreaseButton = new Skeleton().create("w-7", "h-7");
                quantityBox.appendChild(skeletonDecreaseButton);
                quantityBox.appendChild(skeletonInput);
                quantityBox.appendChild(skeletonIncreaseButton);

                const skeletonTotal = new Skeleton().create("w-3/4", "h-4");
                skeletonTotal.classList.add("total");

                details.appendChild(skeletonTitle);
                details.appendChild(skeletonPrice);
                details.appendChild(quantityBox);
                details.appendChild(skeletonTotal);

                const skeletonCloseButton = new Skeleton().create("w-5", "h-5");
                skeletonCloseButton.classList.add("btn-close");

                skeletnBox.appendChild(imageBox);
                skeletnBox.appendChild(details);
                skeletnBox.appendChild(skeletonCloseButton);

                skeleton.appendChild(skeletnBox);
            }
        }
    }

    showSkeleton() {
        const skeleton = document.getElementById("skeleton");
        if (skeleton) {
            skeleton.classList.remove("hidden");
        }
        const productList = document.getElementById("productList");
        if (productList) {
            productList.classList.add("hidden");
        }
    }
    hideSkeleton() {
        const skeleton = document.getElementById("skeleton");
        if (skeleton) {
            skeleton.classList.add("hidden");
        }
        const productList = document.getElementById("productList");
        if (productList) {
            productList.classList.remove("hidden");
        }
    }

    addUserName(currentUser: string | null) {
        let aElement = document.getElementById("currentUserName") as HTMLLinkElement;
        if (currentUser != null) {
            const current = JSON.parse(currentUser);
            if (current.userInformation) {
                //let pElement = document.getElementById("userName");
                if (aElement) {
                    console.log("in if pElement");
                    if (current.userInformation.firstName) {
                        aElement.textContent = current.userInformation.firstName;
                    } else {
                        aElement.textContent = "User" + current.id;
                    }
                    //TODO: link to profile edit page
                    aElement.href = "";
                }
            }
        } else {
            console.log("in else");
            if (aElement) {
                aElement.textContent = "Giriş Yap";
                aElement.href = "Login.html";
            }
        }
    }

    slide(id: number) {
        const product = document.getElementById(id.toString());
        if (product) {
            product.classList.add("transition-transform -translate-x-full");
        }
    }
}
