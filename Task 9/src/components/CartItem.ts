import UI from "../controllers/ShoppingCartUI.js";
import type { Product } from "../models/Product";
import ChangeQuantityButton from "./ChangeQuantityButton.js";
import QuantityInputField from "./QuantityInputField.js";

export default class CartItem {
    product: Product;
    ui: UI;
    decreaseHandler: () => void;
    increaseHandler: () => void;
    changeQuantityHandler: (value: number) => void;
    deleteIconSrc: string;
    deleteProductsHandler: () => void;
    constructor(product: Product, decreaseHandler: () => void, increaseHandler: () => void, changeQuantityHandler: (value: number) => void, deleteIconSrc: string, deleteProductsHandler: () => void) {
        this.product = product;
        this.ui = new UI();
        this.decreaseHandler = decreaseHandler;
        this.increaseHandler = increaseHandler;
        this.changeQuantityHandler = changeQuantityHandler;
        this.deleteIconSrc = deleteIconSrc;
        this.deleteProductsHandler = deleteProductsHandler;
    }

    createItem(): HTMLElement {
        const id = this.product.id;

        const productBox = this.ui.createArticle("productBox", id);

        const imgBox = this.createProductImage(id);

        const productDetails = this.createProductDetails(id);

        const btnClose = this.createCloseOption(id);

        productBox.appendChild(imgBox);
        productBox.appendChild(productDetails);
        productBox.appendChild(btnClose);

        return productBox;
    }

    createProductImage(id: number): HTMLElement {
        const imgBox = this.ui.createDiv("imageBox", id);
        const img = this.ui.createImage(this.product.thumbnail);
        imgBox.appendChild(img);
        return imgBox;
    }

    createProductDetails(id: number): HTMLElement {
        const productDetails = this.ui.createDiv("productDetails", id);

        const title = this.ui.createP(this.product.title, "title", id);
        const price = this.ui.createP(this.product.price.toFixed(2) + "$", "price", id);
        const spanPrice = this.ui.createSpan("BIRIM FIYAT: ", "lg:hidden", id);
        price.prepend(spanPrice);

        const quantityBox = this.createQuantityBox(id);

        const totalDiv = this.ui.createDiv("totalDiv", id);
        const spinner = this.ui.createSpinner(id);
        const total = this.createTotal(id);

        totalDiv.appendChild(spinner);
        totalDiv.appendChild(total);

        productDetails.appendChild(title);
        productDetails.appendChild(price);
        productDetails.appendChild(quantityBox);
        productDetails.appendChild(totalDiv);

        return productDetails;
    }

    createQuantityBox(id: number): HTMLElement {
        const quantityBox = this.ui.createDiv("quantityBox", id);
        const btnDecrease = new ChangeQuantityButton("dec" + id, "-", ["btn"], this.decreaseHandler).getElement(); //this.ui.createButton("-", "btn", "dec" + id, this.decreaseHandler);
        const quantity = new QuantityInputField(this.product.quantity, "quantity" + id, this.changeQuantityHandler).getElement();
        //const quantity = this.ui.createInput(this.product.quantity, "quantity", id, this.changeQuantityHandler);
        const btnIncrease = new ChangeQuantityButton("inc" + id, "+", ["btn"], this.increaseHandler).getElement(); //this.ui.createButton("+", "btn", "inc" + id, this.increaseHandler);

        quantityBox.appendChild(btnDecrease);
        quantityBox.appendChild(quantity);
        quantityBox.appendChild(btnIncrease);

        return quantityBox;
    }

    createTotal(id: number): HTMLParagraphElement {
        const total = this.ui.createP("", "total", id);
        const spanTotalLabel = this.ui.createSpan("TOPLAM FIYAT: ", "lg:hidden", id);
        const spanTotal = this.ui.createSpan(this.product.total.toFixed(2) + "$", "totalValue", id);
        total.appendChild(spanTotalLabel);
        total.appendChild(spanTotal);

        return total;
    }

    createCloseOption(id: number): HTMLButtonElement {
        const deleteIcon = this.ui.createImage(this.deleteIconSrc);

        //const closeHandler = () => this.deleteProductsHandler(id);
        const btnClose = new ChangeQuantityButton("clo" + id, "", ["btn-close"], this.deleteProductsHandler).getElement(); //this.ui.createButton("", "btn-close", "clo" + id, this.deleteProductsHandler);

        btnClose.appendChild(deleteIcon);
        return btnClose;
    }
}
