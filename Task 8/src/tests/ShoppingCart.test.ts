//import ShoppingCart from "../controllers/ShoppingCart";
//import { describe, test, expect } from "@jest/globals";

export function sum(a: number, b: number): number {
    return a + b;
}

describe("sum()", () => {
    test("adds two numbers", () => {
        expect(sum(2, 3)).toBe(5);
    });
});

// describe("ShoppingCart", () => {
//     test("should throw error", () => {
//         expect(() => {
//             new ShoppingCart("https://dummyjson.com/carts/abc");
//         }).toThrow();
//     });
// });
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
