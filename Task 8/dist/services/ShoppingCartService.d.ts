import type { Product } from "../models/Product.js";
import type { Cart } from "../models/Cart.js";
export default class ShoppingCartService {
    url: string;
    constructor(url: string);
    fetchCart(): Promise<Cart | undefined>;
    mapToCart(data: any): Cart;
    updateCart(cartTotal: number, totalQuantity: number, id: number, quantity: number, total: number): Promise<Cart | undefined>;
    updateCart(cartTotal: number, totalQuantity: number, product: Product[]): Promise<Cart | undefined>;
}
//# sourceMappingURL=ShoppingCartService.d.ts.map