import UI from "../controllers/UI.js";
import type { Product } from "../models/Product";
export default class CartItem {
    product: Product;
    ui: UI;
    decreaseHandler: () => void;
    increaseHandler: () => void;
    changeQuantityHandler: (value: number) => void;
    deleteIconSrc: string;
    deleteProductsHandler: () => void;
    constructor(product: Product, decreaseHandler: () => void, increaseHandler: () => void, changeQuantityHandler: (value: number) => void, deleteIconSrc: string, deleteProductsHandler: () => void);
    createItem(): HTMLElement;
    createProductImage(id: number): HTMLElement;
    createProductDetails(id: number): HTMLElement;
    createQuantityBox(id: number): HTMLElement;
    createTotal(id: number): HTMLParagraphElement;
    createCloseOption(id: number): HTMLButtonElement;
}
//# sourceMappingURL=CartItem.d.ts.map