import UI from "./UI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
import type { Product } from "../models/Product.js";
export default class ShoppingCart {
    ui: UI;
    service: ShoppingCartService;
    constructor(url: string);
    init(): Promise<void>;
    listProducts(products: Product[]): void;
    increaseQuantity(id: number): void;
    decreaseQuantity(id: number): void;
    changeQuantity(id: number, newQuantity: number): void;
    deleteProducts(id: number): Promise<void>;
}
//# sourceMappingURL=ShoppingCart.d.ts.map