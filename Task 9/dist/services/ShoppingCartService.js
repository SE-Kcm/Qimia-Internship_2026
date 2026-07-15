//import cartData from "../mocks/cart.json";
import { initialCart } from "../constants/InitialCart.js";
export default class ShoppingCartService {
    cart = initialCart;
    constructor() { }
    async createInitialCart() {
        const response = await fetch("../mocks/cart.json");
        const cartData = await response.json();
        if (typeof cartData.id != "number" ||
            !Array.isArray(cartData.products) ||
            typeof cartData.total != "number" ||
            typeof cartData.discountedTotal != "number" ||
            typeof cartData.userId != "number" ||
            typeof cartData.totalProducts != "number" ||
            typeof cartData.totalQuantity != "number") {
            throw new Error("Failed to initialize shopping cart: invalid cart data.");
        }
        for (const product of cartData.products) {
            if (typeof product.id != "number" ||
                typeof product.title != "string" ||
                typeof product.price != "number" ||
                typeof product.quantity != "number" ||
                typeof product.total != "number" ||
                typeof product.discountPercentage != "number" ||
                typeof product.discountedTotal != "number" ||
                typeof product.title != "string") {
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
    getCart() {
        return this.cart;
    }
    getAllProducts() {
        return this.cart.products;
    }
    increaseQuantity(id) {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            product.quantity += 1;
            product.total += product.price;
            this.cart.total += product.price;
            this.cart.totalQuantity += 1;
            return product;
        }
        else {
            throw new Error("Product to be updated not found");
        }
    }
    decreaseQuantity(id) {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
                product.total = Math.abs(product.total - product.price);
                this.cart.total = Math.abs(this.cart.total - product.price);
                this.cart.totalQuantity -= 1;
                return product;
            }
            else {
                this.deleteProducts(id);
                return product;
            }
        }
        else {
            throw new Error("Product to be updated not found");
        }
    }
    changeQuantity(id, newQuantity) {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            this.cart.totalQuantity = this.cart.totalQuantity - product.quantity + newQuantity;
            this.cart.total = this.cart.total - product.total + product.price * newQuantity;
            product.quantity = newQuantity;
            product.total = product.price * newQuantity;
            return product;
        }
        else {
            throw new Error("Product to be updated not found");
        }
    }
    deleteProducts(id) {
        const product = this.cart.products.find((item) => item.id === id);
        if (product) {
            this.cart.total = Math.abs(this.cart.total - product.total);
            this.cart.totalQuantity -= product.quantity;
            this.cart.totalProducts -= 1;
            this.cart.products = this.cart.products.filter((item) => item.id != id);
        }
        else {
            throw new Error("Product to be deleted not found");
        }
    }
}
//# sourceMappingURL=ShoppingCartService.js.map