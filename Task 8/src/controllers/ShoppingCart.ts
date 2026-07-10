import type { Cart } from "../models/Cart.js";
import UI from "./UI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
import { initialCart } from "../constants/InitialCart.js";
import { deleteIconSrc } from "../constants/deleteIcon.js";

export default class ShoppingCart {
    url: string;
    cart: Cart;
    ui: UI;
    service: ShoppingCartService;
    constructor(url: string) {
        this.url = url;
        this.ui = new UI();
        this.service = new ShoppingCartService(url);
        this.cart = initialCart;
        this.init();
    }

    async init() {
        const data = await this.service.fetchCart();
        if (data) {
            this.cart = data;
            this.listProducts();
            this.ui.updateCartQuantity(this.cart.totalQuantity);
            this.calculateCartTotal();
            this.calculateCartSubTotal();
        }
    }
    listProducts() {
        for (const product of this.cart.products) {
            const id = product.id;

            const productList = document.getElementById("productList");

            const productBox = this.ui.createArticle("productBox", id);

            const imgBox = this.ui.createDiv("imgageBox", id);
            const img = this.ui.createImage(product.thumbnail);
            imgBox.appendChild(img);

            const productDetails = this.ui.createDiv("productDetails", id);
            const title = this.ui.createP(product.title, "title", id);
            const price = this.ui.createP(product.price.toFixed(2) + "$", "price", id);
            const spanPrice = this.ui.createSpan("BIRIM FIYAT: ", "lg:hidden", id);
            price.prepend(spanPrice);
            const quantityBox = this.ui.createDiv("quantityBox", id);
            const btnDecrease = this.ui.createButton("-", "btn", "dec" + id, () => this.decreaseQuantity(id));
            const quantity = this.ui.createInput(product.quantity.toString(), "quantity", id, (value) => this.changeQuantity(id, value));
            const btnIncrease = this.ui.createButton("+", "btn", "inc" + id, () => this.increaseQuantity(id));
            quantityBox.appendChild(btnDecrease);
            quantityBox.appendChild(quantity);
            quantityBox.appendChild(btnIncrease);
            const total = this.ui.createP("", "total", id);
            const spanTotalLabel = this.ui.createSpan("TOPLAM FIYAT: ", "lg:hidden", id);
            const spanTotal = this.ui.createP(product.total.toFixed(2) + "$", "totalValue", id);
            total.appendChild(spanTotalLabel);
            total.appendChild(spanTotal);

            productDetails.appendChild(title);
            productDetails.appendChild(price);
            productDetails.appendChild(quantityBox);
            productDetails.appendChild(total);
            const deleteIcon = this.ui.createImage(deleteIconSrc);
            const btnClose = this.ui.createButton("", "btn-close", "clo" + id, () => {
                this.deleteProducts(id);
                btnDecrease.removeEventListener("click", () => this.decreaseQuantity(id));
                btnIncrease.removeEventListener("click", () => this.increaseQuantity(id));
                btnClose.removeEventListener("click", () => this.deleteProducts(id));
            });

            btnClose.appendChild(deleteIcon);

            productBox.appendChild(imgBox);
            productBox.appendChild(productDetails);
            productBox.appendChild(btnClose);

            productList?.appendChild(productBox);
            this.calculateCartTotal();
            this.calculateCartSubTotal();
        }
    }

    async increaseQuantity(id: number) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            const updatedCart = await this.service.updateCart(this.cart.total + product.price, this.cart.totalQuantity + 1, id, product.quantity + 1, product.total + product.price);
            if (updatedCart) {
                console.log("updateCart valid");
                this.cart.total = this.cart.total + product.price;
                this.cart.totalQuantity = this.cart.totalQuantity + 1;
                product.total = product.total + product.price;
                product.quantity = product.quantity + 1;
                //this.cart = updatedCart;
                //product = this.cart.products.find((product) => product.id === id);
                if (product) {
                    this.ui.updateQuantity(id, product.quantity);
                    this.ui.updateTotal(id, product.total.toFixed(2));
                    this.ui.updateCartTotal(this.cart.total);
                    this.ui.updateCartQuantity(this.cart.totalQuantity);
                    this.calculateCartTotal();
                    this.calculateCartSubTotal();
                }
            }
        } else {
            alert("There was no product found");
        }
    }

    async decreaseQuantity(id: number) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            let quantity = product.quantity;
            if (quantity != 0) {
                quantity = product.quantity - 1;
                const total = product.total - product.price;
                const updatedCart = await this.service.updateCart(this.cart.total - product.price, this.cart.totalQuantity - 1, id, quantity, total);
                if (updatedCart) {
                    //this.cart = updatedCart;
                    this.cart.total = this.cart.total - product.price;
                    this.cart.totalQuantity = this.cart.totalQuantity - 1;
                    product.total = product.total - product.price;
                    product.quantity = product.quantity - 1;
                    //product = this.cart.products.find((product) => product.id === id);
                    if (product) {
                        this.ui.updateQuantity(id, product.quantity);
                        this.ui.updateTotal(id, product.total.toFixed(2));
                        this.ui.updateCartTotal(this.cart.total);
                        this.ui.updateCartQuantity(this.cart.totalQuantity);
                        this.calculateCartTotal();
                        this.calculateCartSubTotal();
                    }
                }
            }
        } else {
            alert("There was no product found");
        }
    }

    async changeQuantity(id: number, newQuantity: number) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            if (product.quantity != newQuantity) {
                const newTotal = newQuantity * product.price;
                const newCartTotal = this.cart.total - product.total + newTotal;
                const newCartQuantity = this.cart.totalQuantity - product.quantity + newQuantity;
                const updatedCart = await this.service.updateCart(newCartTotal, newCartQuantity, id, newQuantity, newTotal);
                if (updatedCart) {
                    //this.cart = updatedCart;
                    this.cart.total = newCartTotal;
                    this.cart.totalQuantity = newQuantity;
                    product.total = newTotal;
                    product.quantity = newQuantity;
                    //product = this.cart.products.find((product) => product.id === id);
                    if (product) {
                        this.ui.updateQuantity(id, product.quantity);
                        this.ui.updateTotal(id, product.total.toFixed(2));
                        this.ui.updateCartTotal(this.cart.total);
                        this.ui.updateCartQuantity(this.cart.totalQuantity);
                        this.calculateCartTotal();
                        this.calculateCartSubTotal();
                    }
                }
            }
        } else {
            alert("There was no product found");
        }
    }

    async deleteProducts(id: number) {
        const len = this.cart.products.length;
        if (len === 1) {
            this.ui.toggle(true);
        }
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            const newProducts = this.cart.products.filter((item) => item.id != id);
            //console.log("newProducts:", newProducts);
            const newCartTotal = this.cart.total - product.total;
            //console.log("newCartTotal:", newCartTotal);
            const newCartQuantity = this.cart.totalQuantity - product.quantity;
            //console.log("newCartQuantity:", newCartQuantity);
            const updatedCart = await this.service.updateCart(newCartTotal, newCartQuantity, undefined, undefined, undefined, newProducts);
            if (updatedCart) {
                this.cart.total = newCartTotal;
                this.cart.totalQuantity = newCartQuantity;
                this.cart.products = newProducts;
                const len = this.cart.products.length;
                if (len === 0) {
                    this.ui.toggle(true);
                }
                //this.cart = updatedCart;
                console.log("updatedCart: ", this.cart);
                this.ui.deleteProductBox(id);
                this.ui.updateCartQuantity(this.cart.totalQuantity);
                this.calculateCartTotal();
                this.calculateCartSubTotal();
            }
        }
    }

    calculateCartSubTotal() {
        let sum = 0;
        for (const product of this.cart.products) {
            sum += product.total;
        }
        this.ui.updateCartSubTotal(sum);
    }

    calculateCartTotal() {
        let sum = 0;
        for (const product of this.cart.products) {
            sum += product.total;
        }
        this.ui.updateCartTotal(sum);
    }
}
