export default class ShoppingCartService {
    url;
    constructor(url) {
        this.url = url;
    }
    async fetchCart() {
        try {
            const cartResponse = await fetch(this.url);
            if (!cartResponse.ok) {
                // alert("Couldn't load the Cart!");
                // return;
                throw new Error("Couldn't load the Cart!");
            }
            const data = await cartResponse.json();
            return this.mapToCart(data);
        }
        catch (networkError) {
            throw networkError;
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
    async updateCart(cartTotal, totalQuantity, idOrProduct, quantity, total) {
        try {
            if (typeof idOrProduct === "number") {
                const updatedCart = await fetch(this.url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        merge: true,
                        products: [
                            {
                                id: idOrProduct,
                                quantity: quantity,
                                total: total,
                            },
                        ],
                        total: cartTotal,
                        totalQuantity: totalQuantity,
                    }),
                });
                if (!updatedCart.ok) {
                    console.error(`Server Error Status: ${updatedCart.status}`);
                    return;
                }
                const data = await updatedCart.json();
                return this.mapToCart(data);
            }
            else if (Array.isArray(idOrProduct)) {
                const updatedCart = await fetch(this.url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        merge: false,
                        products: idOrProduct,
                        total: cartTotal,
                        totalQuantity: totalQuantity,
                    }),
                });
                if (!updatedCart.ok) {
                    console.error(`Server Error Status: ${updatedCart.status}`);
                    return;
                }
                const data = await updatedCart.json();
                return this.mapToCart(data);
            } //else {
            //     throw new Error("Invalid update request!");
            // }
        }
        catch (networkError) {
            console.error("Network/Fetch Error:", networkError);
        }
    }
}
//# sourceMappingURL=ShoppingCartService.js.map