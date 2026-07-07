import type { Product } from "./Product.js";

export type Cart = {
    id: number;
    products: Product[];
    total: number;
    discountedTotal: number;
    userID: number;
    totalProducts: number;
    totalQuantity: number;
};
