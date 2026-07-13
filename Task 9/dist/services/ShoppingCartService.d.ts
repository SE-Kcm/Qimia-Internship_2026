import type { Product } from "../models/Product.js";
import type { Cart } from "../models/Cart.js";
export default class ShoppingCartService {
    cart: Cart;
    constructor();
    createInitialCart(): Promise<void>;
    getCart(): Cart;
    getAllProducts(): Product[];
    increaseQuantity(id: number): Product;
    decreaseQuantity(id: number): Product;
    changeQuantity(id: number, newQuantity: number): Product;
    deleteProducts(id: number): void;
}
//# sourceMappingURL=ShoppingCartService.d.ts.map