import type ShoppingCart from "./ShoppingCart";

export default class UI {
  createDiv(divName: string, id: number): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add(divName);
    div.id = divName + id;
    return div;
  }

  createH2(text: string): HTMLHeadingElement {
    const h2 = document.createElement("h2");
    h2.textContent = text;
    return h2;
  }

  createH3(text: string): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    h3.textContent = "Total: " + text + "$";
    return h3;
  }
  createH4(text: string): HTMLHeadingElement {
    const h4 = document.createElement("h4");
    h4.textContent = text + "$";
    return h4;
  }
  createH5(text: string): HTMLHeadingElement {
    const h5 = document.createElement("h5");
    h5.textContent = text;
    return h5;
  }

  createProductImage(srcUrl: string): HTMLImageElement {
    const img = document.createElement("img");
    img.src = srcUrl;
    return img;
  }

  createButton(
    content: string,
    className: string,
    id: string,
    buttonHandler: () => void,
  ): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.classList.add(className);
    btn.textContent = content;
    btn.id = id;
    btn.addEventListener("click", buttonHandler);

    return btn;
  }

  destroyButton(btn: HTMLButtonElement, buttonHandler: () => void) {
    btn.removeEventListener("click", buttonHandler);
  }

  updateQuantity(id: number, newContent: number) {
    const element = document.getElementById("quantity" + id);
    const h5 = element?.querySelector("h5");
    h5!.textContent = newContent.toString();
    console.log("update:", id);
  }

  updateTotal(id: number, newContent: string) {
    const element = document.getElementById("productBox" + id);
    const h3 = element?.querySelector("h3");
    h3!.textContent = "Total: " + newContent + "$";
  }

  updateCartTotal(newTotal: number) {
    const element = document.getElementById("checkout");
    element?.querySelector("h2");
    element!.textContent = "TOTAL: " + newTotal.toFixed(2) + "$";
  }

  deleteProductBox(id: number) {
    document.getElementById("productBox" + id)?.remove();
  }
}
