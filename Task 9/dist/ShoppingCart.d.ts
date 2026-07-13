import type { Cart } from "./Cart.js";
import UI from "./UI.js";
export default class ShoppingCart {
    url: string;
    cart: Cart;
    ui: UI;
    constructor(url: string);
    fetchCart(): Promise<void>;
    listProducts(): void;
    increaseQuantity(id: number): void;
    decreaseQuantity(id: number): void;
    deleteProducts(btn: HTMLButtonElement, id: number): void;
    calculateCartTotal(): void;
}
//# sourceMappingURL=ShoppingCart.d.ts.map