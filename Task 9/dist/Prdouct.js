export default class Product {
    title;
    price;
    quantity;
    imgURL;
    constructor(title, price, quantity, imgURL) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.imgURL = imgURL;
    }
    getTitle() {
        return this.title;
    }
    getPrice() {
        return this.price;
    }
    getQuantity() {
        return this.quantity;
    }
    setQuantity(newQuantity) {
        this.quantity = newQuantity;
    }
    getImgURL() {
        return this.imgURL;
    }
}
//# sourceMappingURL=Prdouct.js.map