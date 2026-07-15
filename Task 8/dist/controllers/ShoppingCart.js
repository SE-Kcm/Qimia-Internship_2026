import UI from "./UI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
import { initialCart } from "../constants/InitialCart.js";
import { deleteIconSrc } from "../constants/deleteIcon.js";
import CartItem from "../components/CartItem.js";
export default class ShoppingCart {
    url;
    cart;
    ui;
    service;
    constructor(url) {
        this.url = url;
        this.ui = new UI();
        this.service = new ShoppingCartService(url);
        this.cart = initialCart;
        //this.init();
    }
    async init() {
        try {
            const data = await this.service.fetchCart();
            if (data) {
                this.cart = data;
                this.listProducts();
                this.ui.updateCartQuantity(this.cart.totalQuantity);
                this.calculateCartTotal();
                this.calculateCartSubTotal();
            }
        }
        catch (error) {
            console.error(error);
            alert("Couldn't load the Cart!");
        }
    }
    listProducts() {
        const productList = document.getElementById("productList");
        if (productList) {
            for (const product of this.cart.products) {
                const id = product.id;
                const cartItem = new CartItem(product, () => this.decreaseQuantity(id), () => this.increaseQuantity(id), (value) => this.changeQuantity(id, value), deleteIconSrc, () => this.deleteProducts(id));
                const productBox = cartItem.createItem();
                productList.appendChild(productBox);
            }
        }
    }
    async increaseQuantity(id) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            this.ui.showLoader(id);
            const updatedCart = await this.service.updateCart(this.cart.total + product.price, this.cart.totalQuantity + 1, id, product.quantity + 1, product.total + product.price);
            if (updatedCart) {
                this.cart.total = this.cart.total + product.price;
                this.cart.totalQuantity = this.cart.totalQuantity + 1;
                product.total = product.total + product.price;
                product.quantity = product.quantity + 1;
                this.ui.updateQuantity(id, product.quantity);
                this.ui.updateTotal(id, product.total.toFixed(2));
                this.ui.updateCartTotal(this.cart.total);
                this.ui.updateCartQuantity(this.cart.totalQuantity);
                this.calculateCartTotal();
                this.calculateCartSubTotal();
                this.ui.hideLoader(id);
            }
        }
        else {
            alert("There was no product found");
        }
    }
    async decreaseQuantity(id) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            let quantity = product.quantity;
            if (quantity > 1) {
                quantity = product.quantity - 1;
                const total = product.total - product.price;
                this.ui.showLoader(id);
                const updatedCart = await this.service.updateCart(this.cart.total - product.price, this.cart.totalQuantity - 1, id, quantity, total);
                if (updatedCart) {
                    this.cart.total = this.cart.total - product.price;
                    this.cart.totalQuantity = this.cart.totalQuantity - 1;
                    product.total = product.total - product.price;
                    product.quantity = product.quantity - 1;
                    this.ui.updateQuantity(id, product.quantity);
                    this.ui.updateTotal(id, product.total.toFixed(2));
                    this.ui.updateCartTotal(this.cart.total);
                    this.ui.updateCartQuantity(this.cart.totalQuantity);
                    this.calculateCartTotal();
                    this.calculateCartSubTotal();
                    this.ui.hideLoader(id);
                }
            }
            else if (quantity <= 1) {
                this.deleteProducts(id);
            }
        }
        else {
            alert("There was no product found");
        }
    }
    async changeQuantity(id, newQuantity) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            if (newQuantity === 0) {
                this.deleteProducts(id);
            }
            else if (product.quantity != newQuantity) {
                this.ui.showLoader(id);
                const newTotal = newQuantity * product.price;
                const newCartTotal = this.cart.total - product.total + newTotal;
                const newCartQuantity = this.cart.totalQuantity - product.quantity + newQuantity;
                const updatedCart = await this.service.updateCart(newCartTotal, newCartQuantity, id, newQuantity, newTotal);
                if (updatedCart) {
                    this.cart.total = newCartTotal;
                    this.cart.totalQuantity = newCartQuantity;
                    product.total = newTotal;
                    product.quantity = newQuantity;
                    this.ui.updateQuantity(id, product.quantity);
                    this.ui.updateTotal(id, product.total.toFixed(2));
                    this.ui.updateCartTotal(this.cart.total);
                    this.ui.updateCartSubTotal(this.cart.total);
                    this.ui.updateCartQuantity(this.cart.totalQuantity);
                    //this.calculateCartTotal();
                    //this.calculateCartSubTotal();
                    this.ui.hideLoader(id);
                }
            }
        }
        else {
            alert("There was no product found");
        }
    }
    async deleteProducts(id) {
        const len = this.cart.products.length;
        if (len === 1) {
            this.ui.toggle(true);
        }
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            const newProducts = this.cart.products.filter((item) => item.id != id);
            const newCartTotal = this.cart.total - product.total;
            const newCartQuantity = this.cart.totalQuantity - product.quantity;
            const updatedCart = await this.service.updateCart(newCartTotal, newCartQuantity, newProducts);
            if (updatedCart) {
                this.cart.total = newCartTotal;
                this.cart.totalQuantity = newCartQuantity;
                this.cart.products = newProducts;
                const len = this.cart.products.length;
                if (len === 0) {
                    this.ui.toggle(true);
                }
                this.ui.deleteProductBox(id);
                this.ui.updateCartQuantity(this.cart.totalQuantity);
                this.calculateCartTotal();
                this.calculateCartSubTotal();
            }
        }
    }
    calculateCartSubTotal() {
        let sum = 0;
        if (this.cart.products.length != 0) {
            for (const product of this.cart.products) {
                sum += product.total;
            }
        }
        this.ui.updateCartSubTotal(sum);
    }
    calculateCartTotal() {
        let sum = 0;
        if (this.cart.products.length != 0) {
            for (const product of this.cart.products) {
                sum += product.total;
            }
        }
        this.ui.updateCartTotal(sum);
    }
}
//# sourceMappingURL=ShoppingCart.js.map