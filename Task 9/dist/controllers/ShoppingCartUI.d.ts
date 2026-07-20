export default class UI {
    createDiv(divName: string, id: number): HTMLDivElement;
    createArticle(articleName: string, id: number): HTMLElement;
    createP(content: string, className: string, id: number): HTMLParagraphElement;
    createSpan(content: string, className: string, id: number): HTMLSpanElement;
    createImage(srcUrl: string): HTMLImageElement;
    updateQuantity(id: number, newContent: number): void;
    updateTotal(id: number, newContent: string): void;
    updateCartSubTotal(newTotal: number): void;
    updateCartTotal(newTotal: number): void;
    updateCartQuantity(quantity: number): void;
    deleteProductBox(id: number): void;
    createSpinner(id: number): HTMLElement;
    showLoader(id: number): void;
    hideLoader(id: number): void;
    toggle(toggle: boolean): void;
    imagesLoaded(): Promise<void>;
    showSkeleton(): void;
    hideSkeleton(): void;
    addUserName(currentUser: string | null): void;
}
//# sourceMappingURL=ShoppingCartUI.d.ts.map