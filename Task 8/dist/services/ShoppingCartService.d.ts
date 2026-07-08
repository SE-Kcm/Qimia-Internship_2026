import type { Cart } from "../models/Cart.js";
export default class ShoppingCartService {
    url: string;
    constructor(url: string);
    fetchCart(): Promise<Cart | undefined>;
    mapToCart(data: any): Cart;
    updateCart(id: number, quantity: number, total: number, cartTotal: number, totalQuantity: number): Promise<Cart | undefined>;
}
//# sourceMappingURL=ShoppingCartService.d.ts.map