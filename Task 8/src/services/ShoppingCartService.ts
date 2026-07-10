import type { Product } from "../models/Product.js";
import type { Cart } from "../models/Cart.js";

export default class ShoppingCartService {
    url: string;
    constructor(url: string) {
        this.url = url;
    }
    async fetchCart(): Promise<Cart | undefined> {
        try {
            const cartResponse = await fetch(this.url);
            if (!cartResponse.ok) {
                alert("Couldn't load the Cart!");
                return;
            }
            const data = await cartResponse.json();
            return this.mapToCart(data);
        } catch (networkError) {
            console.error("Network/Fetch Error:", networkError);
        }
    }

    mapToCart(data: any): Cart {
        if (
            typeof data.id !== "number" ||
            !Array.isArray(data.products) ||
            typeof data.total !== "number" ||
            typeof data.discountedTotal !== "number" ||
            typeof data.userId !== "number" ||
            typeof data.totalProducts !== "number" ||
            typeof data.totalQuantity !== "number"
        ) {
            throw new Error("Invalid cart data");
        }
        const cart = {
            id: data.id,
            products: data.products,
            total: data.total,
            discountedTotal: data.discountedTotal,
            userID: data.userId,
            totalProducts: data.totalProducts,
            totalQuantity: data.totalQuantity,
        };
        return cart;
    }

    async updateCart(cartTotal: number, totalQuantity: number, id?: number, quantity?: number, total?: number, product?: Product[]): Promise<Cart | undefined> {
        try {
            if (id != undefined && quantity != undefined && total != undefined) {
                const updatedCart = await fetch(this.url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        merge: true,
                        products: [
                            {
                                id: id,
                                quantity: quantity,
                                total: total,
                            },
                        ],
                        total: cartTotal,
                        totalQuantity: totalQuantity,
                    }),
                });
                if (!updatedCart.ok) {
                    console.error("Server Error Status: ${cartResponse.status}");
                    return;
                }
                const data = await updatedCart.json();
                return this.mapToCart(data);
            } else if (product != undefined) {
                const updatedCart = await fetch(this.url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        merge: false,
                        products: product,
                        total: cartTotal,
                        totalQuantity: totalQuantity,
                    }),
                });
                if (!updatedCart.ok) {
                    console.error("Server Error Status: ${cartResponse.status}");
                    return;
                }
                const data = await updatedCart.json();
                return this.mapToCart(data);
            } else {
                throw new Error("Invalid update request!");
            }
        } catch (networkError) {
            console.error("Network/Fetch Error:", networkError);
        }
    }
}
