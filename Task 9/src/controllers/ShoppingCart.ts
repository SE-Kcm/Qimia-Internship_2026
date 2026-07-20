import type { Cart } from "../models/Cart.js";
import UI from "./ShoppingCartUI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
import { initialCart } from "../constants/InitialCart.js";
import { deleteIconSrc } from "../constants/deleteIcon.js";
import CartItem from "../components/CartItem.js";
import type { Product } from "../models/Product.js";

export default class ShoppingCart {
    ui: UI;
    service: ShoppingCartService;
    cart = initialCart;
    constructor(url: string) {
        this.ui = new UI();
        this.service = new ShoppingCartService();
        //this.init();
    }

    async init() {
        try {
            this.ui.showSkeleton();
            const currentUser = localStorage.getItem("currentUser");
            if (currentUser) {
                this.ui.addUserName(currentUser);
            } else {
                this.ui.addUserName(null);
            }
            await this.service.createInitialCart();
            this.cart = this.service.getCart();
            //await new Promise((resolve) => setTimeout(resolve, 2000));
            this.listProducts();
            await this.ui.imagesLoaded();
            this.ui.hideSkeleton();
        } catch (error) {
            console.error(error);
        }
    }

    listProducts() {
        const productList = document.getElementById("productList");
        if (productList) {
            for (const product of this.cart.products) {
                const id = product.id;
                const cartItem = new CartItem(
                    product,
                    () => this.decreaseQuantity(id),
                    () => this.increaseQuantity(id),
                    (value) => this.changeQuantity(id, value),
                    deleteIconSrc,
                    () => this.deleteProducts(id),
                );

                const productBox = cartItem.createItem();

                productList.appendChild(productBox);
            }
        }
        this.ui.updateCartQuantity(this.cart.totalQuantity);
        this.ui.updateCartSubTotal(this.cart.total);
        this.ui.updateCartTotal(this.cart.total);
    }

    increaseQuantity(id: number) {
        this.ui.showLoader(id);
        try {
            const product = this.service.increaseQuantity(id);
            this.cart = this.service.getCart();
            this.ui.updateQuantity(id, product.quantity);
            this.ui.updateTotal(id, product.total.toFixed(2));
            this.ui.updateCartTotal(this.cart.total);
            this.ui.updateCartSubTotal(this.cart.total);
            this.ui.updateCartQuantity(this.cart.totalQuantity);
        } catch (error) {
            console.error(error);
        } finally {
            this.ui.hideLoader(id);
        }
    }

    decreaseQuantity(id: number) {
        this.ui.showLoader(id);
        try {
            const currentProduct = this.cart.products.find((item) => item.id === id);
            if (currentProduct) {
                const currentQuantity = currentProduct.quantity;
                if (currentQuantity > 1) {
                    const product = this.service.decreaseQuantity(id);
                    this.cart = this.service.getCart();
                    this.ui.updateQuantity(id, product.quantity);
                    this.ui.updateTotal(id, product.total.toFixed(2));
                    this.ui.updateCartTotal(this.cart.total);
                    this.ui.updateCartSubTotal(this.cart.total);
                    this.ui.updateCartQuantity(this.cart.totalQuantity);
                } else if (currentQuantity <= 1) {
                    this.deleteProducts(id);
                    this.cart = this.service.getCart();
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.ui.hideLoader(id);
        }
    }

    changeQuantity(id: number, newQuantity: number) {
        this.ui.showLoader(id);
        try {
            if (newQuantity === 0) {
                this.deleteProducts(id);
            } else {
                const product = this.service.changeQuantity(id, newQuantity);
                const cart = this.service.getCart();
                this.ui.updateQuantity(id, product.quantity);
                this.ui.updateTotal(id, product.total.toFixed(2));
                this.ui.updateCartTotal(cart.total);
                this.ui.updateCartSubTotal(cart.total);
                this.ui.updateCartQuantity(cart.totalQuantity);
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.ui.hideLoader(id);
        }
    }

    async deleteProducts(id: number) {
        try {
            this.service.deleteProducts(id);
            this.cart = this.service.getCart();
            if (this.cart.totalProducts === 0) {
                this.ui.toggle(true);
            }
            this.ui.updateCartTotal(this.cart.total);
            this.ui.updateCartSubTotal(this.cart.total);
            this.ui.updateCartQuantity(this.cart.totalQuantity);
            this.ui.deleteProductBox(id);
        } catch (error) {
            console.error(error);
        }
    }
}
