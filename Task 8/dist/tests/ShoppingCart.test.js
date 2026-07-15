import ShoppingCartService from "../services/ShoppingCartService";
import ShoppingCart from "../controllers/ShoppingCart";
//import { describe, test, expect } from "@jest/globals";
const mockCart = {
    id: 3,
    products: [
        {
            id: 24,
            title: "Phone",
            price: 100,
            quantity: 1,
            total: 100,
            discountPercentage: 0,
            discountedTotal: 100,
            thumbnail: "img.jpg",
        },
    ],
    total: 100,
    discountedTotal: 100,
    userId: 1,
    totalProducts: 1,
    totalQuantity: 1,
};
describe("ShoppingCartService", () => {
    test("Should throw an error if url is not valid", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
        const service = new ShoppingCartService("https://dummyjson.com/carts/abc");
        await expect(service.fetchCart()).rejects.toThrow("Network error");
    });
    test("Should throw an error if fetch returns false", async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false });
        const service = new ShoppingCartService("https://dummyjson.com/carts/abc");
        await expect(service.fetchCart()).rejects.toThrow("Couldn't load the Cart!");
    });
    test("Should throw an error if received data cannot be mapped to Cart type", () => {
        const testData = {
            id: "2",
            products: [],
            total: 100,
            discountedTotal: 90,
            userID: 2,
            totalProducts: 0,
            totalQuantity: 2,
        };
        const service = new ShoppingCartService("https://dummyjson.com/carts/3");
        expect(() => service.mapToCart(testData)).toThrow("Invalid cart data");
    });
    test("should log an error for an unsuccessful server response", async () => {
        const error = jest.spyOn(console, "error").mockImplementation(() => { });
        const service = new ShoppingCartService("https://dummyjson.com/carts/3");
        global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });
        await service.updateCart(100, 2, 2, 2, 100);
        expect(error).toHaveBeenCalledWith("Server Error Status: 404");
        //await expect(service.fetchCart()).rejects.toThrow("Network error");
        error.mockReset();
    });
    test("should log an error for an unsuccessful server response", async () => {
        const error = jest.spyOn(console, "error").mockImplementation(() => { });
        const service = new ShoppingCartService("https://dummyjson.com/carts/3");
        global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });
        const product = {
            id: 1,
            title: "title",
            price: 10,
            quantity: 1,
            total: 10,
            discountPercentage: 0,
            discountedTotal: 0,
            thumbnail: "string",
        };
        const prod = [product];
        await service.updateCart(100, 1, prod);
        expect(error).toHaveBeenCalledWith("Server Error Status: 404");
        //await expect(service.fetchCart()).rejects.toThrow("Network error");
        error.mockReset();
    });
});
describe("ShoppingCart", () => {
    test("should show an alert if Cart couldn't be loaded", async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false });
        global.alert = jest.fn();
        const shoppingCart = new ShoppingCart("https://dummyjson.com/carts/3");
        await shoppingCart.init();
        expect(global.alert).toHaveBeenCalledWith("Couldn't load the Cart!");
    });
    test("should show an alert if product to be updated couldn't be found", async () => {
        global.alert = jest.fn();
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                ...mockCart,
            }),
        });
        const shoppingCart = new ShoppingCart("https://dummyjson.com/carts/3");
        await shoppingCart.init();
        await shoppingCart.increaseQuantity(999);
        expect(global.alert).toHaveBeenCalledWith("There was no product found");
    });
    test("should increase the quantity of an existing product", async () => {
        global.fetch = jest
            .fn()
            .mockResolvedValue({
            ok: true,
            json: async () => ({
                ...mockCart,
            }),
        })
            .mockResolvedValue({
            ok: true,
            json: async () => ({
                ...mockCart,
            }),
        });
        const shoppingCart = new ShoppingCart("https://dummyjson.com/carts/3");
        await shoppingCart.init();
        await shoppingCart.increaseQuantity(24);
        expect(shoppingCart.cart.products[0]?.quantity).toBe(2);
    });
});
//const cart = new ShoppingCart("https://dummyjson.com/carts/abc");
// cart.increaseQuantity(1);
// cart.decreaseQuantity(1);
// cart.changeQuantity(1, 50);
// cart.deleteProducts(1);
// const service = new ShoppingCartService("https://dummyjson.com/carts/3");
// // const data1 = {
// //     id: "2",
// //     products: [],
// //     total: 100,
// //     discountedTotal: 90,
// //     userID: 2,
// //     totalProducts: 0,
// //     totalQuantity: 2,
// // };
// // service.mapToCart(data1);
// const product: Product = {
//     id: 1,
//     title: "title",
//     price: 10,
//     quantity: 1,
//     total: 10,
//     discountPercentage: 0,
//     discountedTotal: 0,
//     thumbnail: "string",
// };
// const prod: Product[] = [product];
// service.updateCart(10, 1, undefined, undefined, undefined, prod);
// service.updateCart(10, 1, 2, 1, 10);
// service.updateCart(10, 1);
//# sourceMappingURL=ShoppingCart.test.js.map