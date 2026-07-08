export default class ShoppingCartService {
    url;
    constructor(url) {
        this.url = url;
    }
    async fetchCart() {
        try {
            const cartResponse = await fetch(this.url);
            if (!cartResponse.ok) {
                console.error("Server Error Status: ${cartResponse.status}");
                return;
            }
            const data = await cartResponse.json();
            return this.mapToCart(data);
        }
        catch (networkError) {
            console.error("Network/Fetch Error:", networkError);
        }
    }
    mapToCart(data) {
        if (typeof data.id !== "number" ||
            !Array.isArray(data.products) ||
            typeof data.total !== "number" ||
            typeof data.discountedTotal !== "number" ||
            typeof data.userId !== "number" ||
            typeof data.totalProducts !== "number" ||
            typeof data.totalQuantity !== "number") {
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
    async updateCart(id, quantity, total, cartTotal, totalQuantity) {
        try {
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
        }
        catch (networkError) {
            console.error("Network/Fetch Error:", networkError);
        }
    }
}
//# sourceMappingURL=ShoppingCartService.js.map