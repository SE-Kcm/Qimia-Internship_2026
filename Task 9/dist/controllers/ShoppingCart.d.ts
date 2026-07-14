import type { Cart } from "../models/Cart.js";
import UI from "./UI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
export default class ShoppingCart {
    ui: UI;
    service: ShoppingCartService;
    cart: Cart;
    constructor(url: string);
    init(): Promise<void>;
    listProducts(): void;
    increaseQuantity(id: number): void;
    decreaseQuantity(id: number): void;
    changeQuantity(id: number, newQuantity: number): void;
    deleteProducts(id: number): Promise<void>;
}
//# sourceMappingURL=ShoppingCart.d.ts.map