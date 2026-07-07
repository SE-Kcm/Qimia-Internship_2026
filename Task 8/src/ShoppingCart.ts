import type { Cart } from "./Cart.js";
import UI from "./UI.js";
export default class ShoppingCart {
    url: string;
    cart: Cart = {
        id: 0,
        products: [],
        total: 0,
        discountedTotal: 0,
        userID: 0,
        totalProducts: 0,
        totalQuantity: 0,
    };
    ui: UI;
    constructor(url: string) {
        this.url = url;
        this.ui = new UI();
        this.calculateCartTotal();
        this.fetchCart();
    }
    async fetchCart() {
        try {
            const cartResponse = await fetch(this.url);
            if (!cartResponse.ok) {
                console.error("Server Error Status: ${cartResponse.status}");
                return;
            }
            const data = (await cartResponse.json()) as Cart;
            this.cart = data;
            this.listProducts();
        } catch (networkError) {
            console.error("Network/Fetch Error:", networkError);
        }
    }

    listProducts() {
        //If cart fetchCart doesn't work i have the cart i have initialized meaning everything would be 0 & nothing would work properly
        for (const product of this.cart.products) {
            const id = product.id;

            const productList = document.getElementById("productList");

            const productBox = this.ui.createDiv("productBox", id);

            const imgBox = this.ui.createDiv("img-box", id);
            const img = this.ui.createProductImage(product.thumbnail);
            imgBox.appendChild(img);

            const productInfo = this.ui.createDiv("productInfo", id);
            const h2 = this.ui.createH2(product.title);
            const h4 = this.ui.createH4(product.price.toString());
            productInfo.appendChild(h2);
            productInfo.appendChild(h4);

            const quantity = this.ui.createDiv("quantity", id);
            const h5 = this.ui.createH5(product.quantity.toString());
            const btnIncrease = this.ui.createButton("+", "btn", "inc" + id, () => this.increaseQuantity(id));
            const btnDecrease = this.ui.createButton("-", "btn", "dec" + id, () => this.decreaseQuantity(id));
            quantity.appendChild(h5);
            quantity.appendChild(btnIncrease);
            quantity.appendChild(btnDecrease);

            const btnClose = this.ui.createButton("X", "btn-close", "clo" + id, () => this.deleteProducts(btnClose, id));
            const h3 = this.ui.createH3(product.total.toFixed(2));

            productBox.appendChild(imgBox);
            productBox.appendChild(productInfo);
            productBox.appendChild(quantity);
            productBox.appendChild(btnClose);
            productBox.appendChild(h3);

            productList?.appendChild(productBox);
            this.calculateCartTotal();
        }
    }

    increaseQuantity(id: number) {
        if (this.cart.products.length === 0) {
            console.error("There are no products in your cart!");
        }
        for (const product of this.cart.products) {
            if (product.id == id) {
                product.quantity += 1;
                this.ui.updateQuantity(id, product.quantity);
                product.total += product.price;
                this.ui.updateTotal(id, product.total.toFixed(2));
                this.calculateCartTotal();
            }
        }
    }

    decreaseQuantity(id: number) {
        if (this.cart.products.length === 0) {
            console.error("There are no products in your cart!");
        }
        for (const product of this.cart.products) {
            if (product.id == id) {
                let quantity = product.quantity;
                if (quantity != 0) {
                    product.quantity -= 1;
                    this.ui.updateQuantity(id, product.quantity);
                    product.total -= product.price;
                    this.ui.updateTotal(id, product.total.toFixed(2));
                    this.calculateCartTotal();
                }
            }
        }
    }

    deleteProducts(btn: HTMLButtonElement, id: number) {
        const length = this.cart.products.length;
        if (length != 0) {
            this.ui.deleteProductBox(id);
            for (let i: number = 0; i < length; i++) {
                const product = this.cart.products[i];
                if (product && product.id == id) {
                    this.cart.products.splice(i, 1);
                }
            }
            this.calculateCartTotal();
        }
    }

    calculateCartTotal() {
        let sum = 0;
        for (const product of this.cart.products) {
            sum += product.total;
        }
        this.ui.updateCartTotal(sum);
    }
}

//<div class="productBox flex justify-between bg-gray-300 gap-3 m-1">
//     <div class="img-box md:w-40 w-20">
//         <img src="https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp" />
//     </div>
//     <div class="productInfo ">
//         <h2>Man Short Sleeve Shirt</h2>
//         <h4>19.99$</h3>
//     </div>
//     <div class="quantity flex justify-center items-center gap-2">
//         <h5>5</h4>
//         <button class="btn">+</button>
//         <butto class="btn">-</button>
//     </div>
//     <h3 class="flex items-end">Total: 99.95$</h2>
// </div>
