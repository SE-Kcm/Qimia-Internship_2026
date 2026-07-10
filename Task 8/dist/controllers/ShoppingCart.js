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
        const productList = document.getElementById("productList");
        if (productList) {
            for (const product of this.cart.products) {
                const id = product.id;
                const cartItem = new CartItem(product, () => this.decreaseQuantity(id), () => this.increaseQuantity(id), (value) => this.changeQuantity(id, value), deleteIconSrc, () => this.deleteProducts(id));
                const productBox = cartItem.createItem();
                // const productBox = this.ui.createArticle("productBox", id);
                // const imgBox = this.ui.createDiv("imgageBox", id);
                // const img = this.ui.createImage(product.thumbnail);
                // imgBox.appendChild(img);
                // const productDetails = this.ui.createDiv("productDetails", id);
                // const title = this.ui.createP(product.title, "title", id);
                // const price = this.ui.createP(product.price.toFixed(2) + "$", "price", id);
                // const spanPrice = this.ui.createSpan("BIRIM FIYAT: ", "lg:hidden", id);
                // price.prepend(spanPrice);
                // const quantityBox = this.ui.createDiv("quantityBox", id);
                // const decreaseHandler = () => this.decreaseQuantity(id);
                // const btnDecrease = this.ui.createButton("-", "btn", "dec" + id, decreaseHandler);
                // const quantity = this.ui.createInput(product.quantity.toString(), "quantity", id, (value) => this.changeQuantity(id, value));
                // const increaseHandler = () => this.increaseQuantity(id);
                // const btnIncrease = this.ui.createButton("+", "btn", "inc" + id, increaseHandler);
                // quantityBox.appendChild(btnDecrease);
                // quantityBox.appendChild(quantity);
                // quantityBox.appendChild(btnIncrease);
                // const total = this.ui.createP("", "total", id);
                // const spanTotalLabel = this.ui.createSpan("TOPLAM FIYAT: ", "lg:hidden", id);
                // const spanTotal = this.ui.createP(product.total.toFixed(2) + "$", "totalValue", id);
                // total.appendChild(spanTotalLabel);
                // total.appendChild(spanTotal);
                // productDetails.appendChild(title);
                // productDetails.appendChild(price);
                // productDetails.appendChild(quantityBox);
                // productDetails.appendChild(total);
                // const deleteIcon = this.ui.createImage(deleteIconSrc);
                // const closeHandler = () => this.deleteProducts(id);
                // const btnClose = this.ui.createButton("", "btn-close", "clo" + id, () => {
                //     this.deleteProducts(id);
                //     btnDecrease.removeEventListener("click", decreaseHandler);
                //     btnIncrease.removeEventListener("click", increaseHandler);
                //     btnClose.removeEventListener("click", closeHandler);
                // });
                // btnClose.appendChild(deleteIcon);
                // productBox.appendChild(imgBox);
                // productBox.appendChild(productDetails);
                // productBox.appendChild(btnClose);
                productList.appendChild(productBox);
            }
        }
    }
    async increaseQuantity(id) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
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
                const newTotal = newQuantity * product.price;
                const newCartTotal = this.cart.total - product.total + newTotal;
                const newCartQuantity = this.cart.totalQuantity - product.quantity + newQuantity;
                const updatedCart = await this.service.updateCart(newCartTotal, newCartQuantity, id, newQuantity, newTotal);
                if (updatedCart) {
                    this.cart.total = newCartTotal;
                    this.cart.totalQuantity = newQuantity;
                    product.total = newTotal;
                    product.quantity = newQuantity;
                    this.ui.updateQuantity(id, product.quantity);
                    this.ui.updateTotal(id, product.total.toFixed(2));
                    this.ui.updateCartTotal(this.cart.total);
                    this.ui.updateCartQuantity(this.cart.totalQuantity);
                    this.calculateCartTotal();
                    this.calculateCartSubTotal();
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
            const updatedCart = await this.service.updateCart(newCartTotal, newCartQuantity, undefined, undefined, undefined, newProducts);
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