import type { Product } from "../models/Product.js";
import type { Cart } from "../models/Cart.js";
//import cartData from "../mocks/cart.json";
import { initialCart } from "../constants/InitialCart.js";
export default class ShoppingCartService {
    cart = initialCart;

    constructor() {
        // this.cart = {
        //     id: cartData.id,
        //     products: cartData.products,
        //     total: cartData.total,
        //     discountedTotal: cartData.discountedTotal,
        //     userId: cartData.userId,
        //     totalProducts: cartData.totalProducts,
        //     totalQuantity: cartData.totalQuantity,
        // };
        //await this.createInitialCart();
    }

    async createInitialCart() {
        const response = await fetch("../mocks/cart.json");
        const cartData = await response.json();
        if (
            typeof cartData.id != "number" ||
            !Array.isArray(cartData.products) ||
            typeof cartData.total != "number" ||
            typeof cartData.discountedTotal != "number" ||
            typeof cartData.userId != "number" ||
            typeof cartData.totalProducts != "number" ||
            typeof cartData.totalQuantity != "number"
        ) {
            throw new Error("Failed to initialize shopping cart: invalid cart data.");
        }
        for (const product of cartData.products) {
            if (
                typeof product.id != "number" ||
                typeof product.title != "string" ||
                typeof product.price != "number" ||
                typeof product.quantity != "number" ||
                typeof product.total != "number" ||
                typeof product.discountPercentage != "number" ||
                typeof product.discountedTotal != "number" ||
                typeof product.title != "string"
            ) {
                throw new Error("Failed to initialize shopping cart: invalid cart data.");
            }
        }
        this.cart = {
            id: cartData.id,
            products: cartData.products,
            total: cartData.total,
            discountedTotal: cartData.discountedTotal,
            userId: cartData.userId,
            totalProducts: cartData.totalProducts,
            totalQuantity: cartData.totalQuantity,
        };
    }

    getCart(): Cart {
        return this.cart;
    }

    getAllProducts(): Product[] {
        return this.cart.products;
    }

    increaseQuantity(id: number): Product {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            product.quantity += 1;
            product.total += product.price;
            this.cart.total += product.price;
            this.cart.totalQuantity += 1;
            return product;
        } else {
            throw new Error("Product to be updated not found");
        }
    }

    decreaseQuantity(id: number): Product {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
                product.total -= product.price;
                this.cart.total -= product.price;
                this.cart.totalQuantity -= 1;
                return product;
            } else {
                this.deleteProducts(id);
                return product;
            }
        } else {
            throw new Error("Product to be updated not found");
        }
    }

    changeQuantity(id: number, newQuantity: number): Product {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            this.cart.totalQuantity = this.cart.totalQuantity - product.quantity + newQuantity;
            product.quantity = newQuantity;
            product.total = product.price * newQuantity;
            this.cart.total += product.total;
            return product;
        } else {
            throw new Error("Product to be updated not found");
        }
    }

    deleteProducts(id: number) {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            this.cart.total -= product.total;
            this.cart.totalQuantity -= product.quantity;
            this.cart.totalProducts -= 1;
        } else {
            throw new Error("Product to be deleted not found");
        }
    }

    // mapToCart(data: any): Cart {
    //     if (
    //         typeof data.id !== "number" ||
    //         !Array.isArray(data.products) ||
    //         typeof data.total !== "number" ||
    //         typeof data.discountedTotal !== "number" ||
    //         typeof data.userId !== "number" ||
    //         typeof data.totalProducts !== "number" ||
    //         typeof data.totalQuantity !== "number"
    //     ) {
    //         throw new Error("Invalid cart data");
    //     }
    //     const cart = {
    //         id: data.id,
    //         products: data.products,
    //         total: data.total,
    //         discountedTotal: data.discountedTotal,
    //         userID: data.userId,
    //         totalProducts: data.totalProducts,
    //         totalQuantity: data.totalQuantity,
    //     };
    //     return cart;
    // }

    // async updateCart(cartTotal: number, totalQuantity: number, id: number, quantity: number, total: number): Promise<Cart | undefined>;
    // async updateCart(cartTotal: number, totalQuantity: number, product: Product[]): Promise<Cart | undefined>;
    // async updateCart(cartTotal: number, totalQuantity: number, idOrProduct?: number | Product[], quantity?: number, total?: number): Promise<Cart | undefined> {
    //     try {
    //         if (typeof idOrProduct === "number") {
    //             const updatedCart = await fetch(this.url, {
    //                 method: "PATCH",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     merge: true,
    //                     products: [
    //                         {
    //                             id: idOrProduct,
    //                             quantity: quantity,
    //                             total: total,
    //                         },
    //                     ],
    //                     total: cartTotal,
    //                     totalQuantity: totalQuantity,
    //                 }),
    //             });
    //             if (!updatedCart.ok) {
    //                 console.error("Server Error Status: ${cartResponse.status}");
    //                 return;
    //             }
    //             const data = await updatedCart.json();
    //             return this.mapToCart(data);
    //         } else if (Array.isArray(idOrProduct)) {
    //             const updatedCart = await fetch(this.url, {
    //                 method: "PATCH",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     merge: false,
    //                     products: idOrProduct,
    //                     total: cartTotal,
    //                     totalQuantity: totalQuantity,
    //                 }),
    //             });
    //             if (!updatedCart.ok) {
    //                 console.error("Server Error Status: ${cartResponse.status}");
    //                 return;
    //             }
    //             const data = await updatedCart.json();
    //             return this.mapToCart(data);
    //         } //else {
    //         //     throw new Error("Invalid update request!");
    //         // }
    //     } catch (networkError) {
    //         console.error("Network/Fetch Error:", networkError);
    //     }
    // }
}
