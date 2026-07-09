import type { Cart } from "../models/Cart.js";
import UI from "./UI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
export default class ShoppingCart {
    url: string;
    cart: Cart;
    ui: UI;
    service: ShoppingCartService;
    constructor(url: string);
    init(): Promise<void>;
    listProducts(): void;
    increaseQuantity(id: number): Promise<void>;
    decreaseQuantity(id: number): Promise<void>;
    changeQuantity(id: number, newQuantity: number): Promise<void>;
    deleteProducts(id: number): Promise<void>;
    calculateCartSubTotal(): void;
    calculateCartTotal(): void;
}
//# sourceMappingURL=ShoppingCart.d.ts.map