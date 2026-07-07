export default class UI {
    createDiv(divName: string, id: number): HTMLDivElement;
    createH2(text: string): HTMLHeadingElement;
    createH3(text: string): HTMLHeadingElement;
    createH4(text: string): HTMLHeadingElement;
    createH5(text: string): HTMLHeadingElement;
    createProductImage(srcUrl: string): HTMLImageElement;
    createButton(content: string, className: string, id: string, buttonHandler: () => void): HTMLButtonElement;
    destroyButton(btn: HTMLButtonElement, buttonHandler: () => void): void;
    updateQuantity(id: number, newContent: number): void;
    updateTotal(id: number, newContent: string): void;
    updateCartTotal(newTotal: number): void;
    deleteProductBox(id: number): void;
}
//# sourceMappingURL=UI.d.ts.map