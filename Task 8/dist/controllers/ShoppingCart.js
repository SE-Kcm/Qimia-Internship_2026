import UI from "../UI.js";
import ShoppingCartService from "../services/ShoppingCartService.js";
import { initialCart } from "../constants/InitialCart.js";
import { deleteIconSrc } from "../constants/deleteIcon.js";
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
        //console.log(data);
        if (data) {
            this.cart = data;
            this.listProducts();
            this.ui.updateCartQuantity(this.cart.totalQuantity);
            this.calculateCartTotal();
            this.calculateCartSubTotal();
        }
    }
    listProducts() {
        console.log(this.cart.products);
        for (const product of this.cart.products) {
            const id = product.id;
            const productList = document.getElementById("productList");
            const productBox = this.ui.createDiv("productBox", id);
            const imgBox = this.ui.createDiv("imgageBox", id);
            const img = this.ui.createImage(product.thumbnail);
            imgBox.appendChild(img);
            const productDetails = this.ui.createDiv("productDetails", id);
            const title = this.ui.createP(product.title, "title", id);
            const price = this.ui.createP(product.price.toFixed(2), "price", id);
            const quantityBox = this.ui.createDiv("quantityBox", id);
            const btnDecrease = this.ui.createButton("-", "btn", "dec" + id, () => this.decreaseQuantity(id));
            const quantity = this.ui.createP(product.quantity.toString(), "quantity", id);
            const btnIncrease = this.ui.createButton("+", "btn", "inc" + id, () => this.increaseQuantity(id));
            quantityBox.appendChild(btnDecrease);
            quantityBox.appendChild(quantity);
            quantityBox.appendChild(btnIncrease);
            const total = this.ui.createP(product.total.toFixed(2), "total", id);
            productDetails.appendChild(title);
            productDetails.appendChild(price);
            productDetails.appendChild(quantityBox);
            productDetails.appendChild(total);
            console.log(deleteIconSrc);
            const deleteIcon = this.ui.createImage(deleteIconSrc);
            const btnClose = this.ui.createButton("", "btn-close", "clo" + id, () => {
                (this.deleteProducts(btnClose, id),
                    btnDecrease.removeEventListener("click", () => this.decreaseQuantity(id)),
                    btnIncrease.removeEventListener("click", () => this.increaseQuantity(id)),
                    btnClose.removeEventListener("click", () => this.deleteProducts(btnClose, id)));
            });
            btnClose.appendChild(deleteIcon);
            console.log(btnClose);
            productBox.appendChild(imgBox);
            productBox.appendChild(productDetails);
            productBox.appendChild(btnClose);
            productList?.appendChild(productBox);
            this.calculateCartTotal();
            this.calculateCartSubTotal();
        }
    }
    async increaseQuantity(id) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            const updatedCart = await this.service.updateCart(id, product.quantity + 1, product.total + product.price, this.cart.total + product.price, this.cart.totalQuantity + 1);
            if (updatedCart) {
                this.cart = updatedCart;
                product = this.cart.products.find((product) => product.id === id);
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
        else {
            alert("There was no product found");
        }
    }
    async decreaseQuantity(id) {
        let product = this.cart.products.find((product) => product.id === id);
        if (product) {
            let quantity = product.quantity;
            if (quantity != 0) {
                quantity = product.quantity - 1;
                const total = product.total - product.price;
                const updatedCart = await this.service.updateCart(id, quantity, total, this.cart.total - product.price, this.cart.totalQuantity - 1);
                if (updatedCart) {
                    this.cart = updatedCart;
                    product = this.cart.products.find((product) => product.id === id);
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
        }
    }
    deleteProducts(btn, id) {
        const length = this.cart.products.length;
        if (length != 0) {
            this.ui.deleteProductBox(id);
            for (let i = 0; i < length; i++) {
                const product = this.cart.products[i];
                if (product && product.id == id) {
                    this.cart.products.splice(i, 1);
                }
            }
            this.calculateCartTotal();
            this.calculateCartSubTotal();
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
//# sourceMappingURL=ShoppingCart.js.map