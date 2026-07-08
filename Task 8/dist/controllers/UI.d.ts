export default class UI {
    createDiv(divName: string, id: number): HTMLDivElement;
    createP(content: string, className: string, id: number): HTMLParagraphElement;
    createSpan(content: string, className: string, id: number): HTMLSpanElement;
    createImage(srcUrl: string): HTMLImageElement;
    createInput(content: string, className: string, id: number): HTMLInputElement;
    createButton(content: string, className: string, id: string, buttonHandler: () => void): HTMLButtonElement;
    updateQuantity(id: number, newContent: number): void;
    updateTotal(id: number, newContent: string): void;
    updateCartSubTotal(newTotal: number): void;
    updateCartTotal(newTotal: number): void;
    updateCartQuantity(quantity: number): void;
    deleteProductBox(id: number): void;
}
//# sourceMappingURL=UI.d.ts.map