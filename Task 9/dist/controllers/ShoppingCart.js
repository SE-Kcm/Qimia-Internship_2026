import UI from "./UI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
import { initialCart } from "../constants/InitialCart.js";
import { deleteIconSrc } from "../constants/deleteIcon.js";
import CartItem from "../components/CartItem.js";
export default class ShoppingCart {
    ui;
    service;
    constructor(url) {
        this.ui = new UI();
        this.service = new ShoppingCartService();
        this.init();
    }
    async init() {
        try {
            await this.service.createInitialCart();
            this.listProducts(this.service.getAllProducts());
        }
        catch (error) {
            console.error(error);
        }
    }
    listProducts(products) {
        const productList = document.getElementById("productList");
        if (productList) {
            for (const product of products) {
                const id = product.id;
                const cartItem = new CartItem(product, () => this.decreaseQuantity(id), () => this.increaseQuantity(id), (value) => this.changeQuantity(id, value), deleteIconSrc, () => this.deleteProducts(id));
                const productBox = cartItem.createItem();
                productList.appendChild(productBox);
            }
        }
    }
    increaseQuantity(id) {
        this.ui.showLoader(id);
        try {
            const product = this.service.increaseQuantity(id);
            const cart = this.service.getCart();
            this.ui.updateQuantity(id, product.quantity);
            this.ui.updateTotal(id, product.total.toFixed(2));
            this.ui.updateCartTotal(cart.total);
            this.ui.updateCartQuantity(cart.totalQuantity);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            this.ui.hideLoader(id);
        }
    }
    decreaseQuantity(id) {
        this.ui.showLoader(id);
        try {
            const product = this.service.decreaseQuantity(id);
            const cart = this.service.getCart();
            this.ui.updateQuantity(id, product.quantity);
            this.ui.updateTotal(id, product.total.toFixed(2));
            this.ui.updateCartTotal(cart.total);
            this.ui.updateCartQuantity(cart.totalQuantity);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            this.ui.hideLoader(id);
        }
    }
    changeQuantity(id, newQuantity) {
        try {
            if (newQuantity === 0) {
                this.deleteProducts(id);
            }
            else {
                const product = this.service.changeQuantity(id, newQuantity);
                const cart = this.service.getCart();
                this.ui.updateQuantity(id, product.quantity);
                this.ui.updateTotal(id, product.total.toFixed(2));
                this.ui.updateCartTotal(cart.total);
                this.ui.updateCartQuantity(cart.totalQuantity);
            }
            this.service.changeQuantity(id, newQuantity);
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteProducts(id) {
        try {
            this.service.deleteProducts(id);
            const cart = this.service.getCart();
            if (cart.products.length === 1) {
                this.ui.toggle(true);
            }
            this.ui.updateCartTotal(cart.total);
            this.ui.updateCartQuantity(cart.totalQuantity);
        }
        catch (error) {
            console.error(error);
        }
    }
}
//# sourceMappingURL=ShoppingCart.js.map