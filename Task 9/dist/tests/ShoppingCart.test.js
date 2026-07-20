import ShoppingCart from "../controllers/ShoppingCart";
import ShoppingCartService from "../services/ShoppingCartService";
describe("ShoppingCartService", () => {
    let service;
    const mockData = {
        id: 3,
        products: [
            {
                id: 24,
                title: "Fish Steak",
                price: 14.99,
                quantity: 1,
                total: 14.99,
                discountPercentage: 4.23,
                discountedTotal: 14.36,
                thumbnail: "test",
            },
        ],
        total: 14.99,
        discountedTotal: 14.36,
        userId: 3,
        totalProducts: 1,
        totalQuantity: 1,
    };
    beforeEach(() => {
        service = new ShoppingCartService();
        service.cart = {
            id: 3,
            products: [
                {
                    id: 24,
                    title: "Fish Steak",
                    price: 14.99,
                    quantity: 1,
                    total: 14.99,
                    discountPercentage: 4.23,
                    discountedTotal: 14.36,
                    thumbnail: "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
                },
            ],
            total: 14.99,
            discountedTotal: 14.36,
            userId: 3,
            totalProducts: 1,
            totalQuantity: 1,
        };
    });
    test("Should throw an error if initializing the cart with invalid data", async () => {
        const mockCart = {
            id: "3",
            products: [
                {
                    id: 24,
                    title: "Fish Steak",
                    price: 14.99,
                    quantity: 1,
                    total: 14.99,
                    discountPercentage: 4.23,
                    discountedTotal: 14.36,
                    thumbnail: "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
                },
            ],
            total: 14.99,
            discountedTotal: 14.36,
            userId: 3,
            totalProducts: 1,
            totalQuantity: 1,
        };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                ...mockCart,
            }),
        });
        //await service.createInitialCart();
        await expect(service.createInitialCart()).rejects.toThrow("Failed to initialize shopping cart: invalid cart data.");
    });
    test("Should throw an error if initializing the cart with invalid data", async () => {
        const mockCart = {
            id: 3,
            products: [
                {
                    id: 24,
                    title: "Fish Steak",
                    price: "14.99",
                    quantity: 1,
                    total: 14.99,
                    discountPercentage: 4.23,
                    discountedTotal: 14.36,
                    thumbnail: "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
                },
            ],
            total: 14.99,
            discountedTotal: 14.36,
            userId: 3,
            totalProducts: 1,
            totalQuantity: 1,
        };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                ...mockCart,
            }),
        });
        //await service.createInitialCart();
        await expect(service.createInitialCart()).rejects.toThrow("Failed to initialize shopping cart: invalid cart data.");
    });
    test("Should initialize the cart with valid data", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                ...mockData,
            }),
        });
        await service.createInitialCart();
        expect(service.getCart()).toEqual(service.cart);
    });
    test("Should increase quantity of product", () => {
        const product = service.increaseQuantity(24);
        expect(product.quantity).toEqual(2);
        expect(product.total).toEqual(29.98);
        expect(service.getCart().total).toEqual(29.98);
        expect(service.getCart().totalQuantity).toEqual(2);
    });
    test("Should throw an error if product to be updated cannot be found", () => {
        expect(() => {
            service.increaseQuantity(999);
        }).toThrow("Product to be updated not found");
    });
    test("Should delete product if quantity is 1 before decreasing", () => {
        service.decreaseQuantity(24);
        expect(service.getAllProducts().length).toEqual(0);
    });
    test("Should decrease quantity of product", () => {
        const mockCart = {
            id: 3,
            products: [
                {
                    id: 24,
                    title: "Fish Steak",
                    price: 14.99,
                    quantity: 2,
                    total: 29.98,
                    discountPercentage: 4.23,
                    discountedTotal: 28.72,
                    thumbnail: "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
                },
            ],
            total: 29.98,
            discountedTotal: 28.72,
            userId: 3,
            totalProducts: 1,
            totalQuantity: 2,
        };
        service.cart = mockCart;
        const product = service.decreaseQuantity(24);
        expect(product.quantity).toEqual(1);
        expect(product.total).toEqual(14.99);
        expect(service.getCart().total).toEqual(14.99);
        expect(service.getCart().totalQuantity).toEqual(1);
    });
    test("Should throw an error if product to be updated cannot be found", () => {
        expect(() => {
            service.decreaseQuantity(999);
        }).toThrow("Product to be updated not found");
    });
    test("Should change quantity of product", () => {
        const product = service.changeQuantity(24, 2);
        expect(product.quantity).toEqual(2);
        expect(product.total).toEqual(29.98);
        expect(service.getCart().total).toEqual(29.98);
        expect(service.getCart().totalQuantity).toEqual(2);
    });
    test("Should throw an error if product to be updated cannot be found", () => {
        expect(() => {
            service.changeQuantity(999, 2);
        }).toThrow("Product to be updated not found");
    });
    test("Should delete product", () => {
        service.deleteProducts(24);
        expect(service.getAllProducts().length).toEqual(0);
        expect(service.getCart().total).toEqual(0.0);
        expect(service.getCart().totalQuantity).toEqual(0);
    });
    test("Should throw an error if product to be deleted cannot be found", () => {
        expect(() => {
            service.deleteProducts(999);
        }).toThrow("Product to be deleted not found");
    });
});
describe("ShoppingCart", () => {
    //let service: ShoppingCartService;
    let cart;
    const mockData = {
        id: 3,
        products: [
            {
                id: 24,
                title: "Fish Steak",
                price: 14.99,
                quantity: 2,
                total: 14.99,
                discountPercentage: 4.23,
                discountedTotal: 14.36,
                thumbnail: "test",
            },
        ],
        total: 14.99,
        discountedTotal: 14.36,
        userId: 3,
        totalProducts: 1,
        totalQuantity: 1,
    };
    beforeEach(() => {
        cart = new ShoppingCart("");
        cart.cart = {
            id: 3,
            products: [
                {
                    id: 24,
                    title: "Fish Steak",
                    price: 14.99,
                    quantity: 1,
                    total: 14.99,
                    discountPercentage: 4.23,
                    discountedTotal: 14.36,
                    thumbnail: "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
                },
            ],
            total: 14.99,
            discountedTotal: 14.36,
            userId: 3,
            totalProducts: 1,
            totalQuantity: 1,
        };
        jest.spyOn(cart.ui, "showLoader").mockImplementation();
        jest.spyOn(cart.ui, "updateQuantity").mockImplementation();
        jest.spyOn(cart.ui, "updateTotal").mockImplementation();
        jest.spyOn(cart.ui, "updateCartTotal").mockImplementation();
        jest.spyOn(cart.ui, "updateCartSubTotal").mockImplementation();
        jest.spyOn(cart.ui, "updateCartQuantity").mockImplementation();
        jest.spyOn(cart.ui, "deleteProductBox").mockImplementation();
        jest.spyOn(cart.ui, "hideLoader").mockImplementation();
    });
    test("Should show initialized cart", async () => {
        jest.spyOn(cart.service, "createInitialCart").mockResolvedValue();
        jest.spyOn(cart.service, "getCart").mockReturnValue(mockData);
        await cart.init();
        expect(cart.cart).toEqual(mockData);
    });
    test("Should log error if cart initialization fails", async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        jest.spyOn(cart.service, "createInitialCart").mockRejectedValue(new Error("Failed to load cart"));
        await cart.init();
        expect(consoleSpy).toHaveBeenCalledWith(new Error("Failed to load cart"));
    });
    test("Should increase quantity of product", () => {
        const updatedProduct = {
            id: 24,
            title: "Fish Steak",
            price: 14.99,
            quantity: 2,
            total: 29.98,
            discountPercentage: 4.23,
            discountedTotal: 28.72,
            thumbnail: "test",
        };
        jest.spyOn(cart.service, "increaseQuantity").mockReturnValue(updatedProduct);
        const updatedCart = {
            ...mockData,
            products: [updatedProduct],
            total: 29.98,
            totalQuantity: 2,
        };
        jest.spyOn(cart.service, "getCart").mockReturnValue(updatedCart);
        cart.increaseQuantity(24);
        expect(cart.service.increaseQuantity).toHaveBeenCalledWith(24);
        expect(cart.ui.updateQuantity).toHaveBeenCalledWith(24, 2);
        expect(cart.ui.updateTotal).toHaveBeenCalledWith(24, "29.98");
        expect(cart.ui.updateCartTotal).toHaveBeenCalledWith(29.98);
        expect(cart.ui.updateCartSubTotal).toHaveBeenCalledWith(29.98);
        expect(cart.ui.updateCartQuantity).toHaveBeenCalledWith(2);
        expect(cart.ui.hideLoader).toHaveBeenCalledWith(24);
    });
    test("Should log error if quantity increasing fails", () => {
        const updatedProduct = {
            id: 24,
            title: "Fish Steak",
            price: 14.99,
            quantity: 2,
            total: 29.98,
            discountPercentage: 4.23,
            discountedTotal: 28.72,
            thumbnail: "test",
        };
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        jest.spyOn(cart.service, "increaseQuantity").mockImplementation(() => {
            throw new Error("Product to be updated not found");
        });
        cart.increaseQuantity(999);
        expect(consoleSpy).toHaveBeenCalledWith(new Error("Product to be updated not found"));
    });
    test("Should decrease quantity of product", () => {
        cart.cart = {
            id: 3,
            products: [
                {
                    id: 24,
                    title: "Fish Steak",
                    price: 14.99,
                    quantity: 2,
                    total: 29.98,
                    discountPercentage: 4.23,
                    discountedTotal: 28.72,
                    thumbnail: "test",
                },
            ],
            total: 29.98,
            discountedTotal: 28.72,
            userId: 3,
            totalProducts: 1,
            totalQuantity: 2,
        };
        const updatedProduct = {
            id: 24,
            title: "Fish Steak",
            price: 14.99,
            quantity: 1,
            total: 14.99,
            discountPercentage: 4.23,
            discountedTotal: 14.36,
            thumbnail: "test",
        };
        jest.spyOn(cart.service, "decreaseQuantity").mockReturnValue(updatedProduct);
        const updatedCart = {
            ...mockData,
            products: [updatedProduct],
            discountedTotal: 14.36,
            total: 14.99,
            totalQuantity: 1,
        };
        jest.spyOn(cart.service, "getCart").mockReturnValue(updatedCart);
        cart.decreaseQuantity(24);
        expect(cart.service.decreaseQuantity).toHaveBeenCalledWith(24);
        expect(cart.ui.updateQuantity).toHaveBeenCalledWith(24, 1);
        expect(cart.ui.updateTotal).toHaveBeenCalledWith(24, "14.99");
        expect(cart.ui.updateCartTotal).toHaveBeenCalledWith(14.99);
        expect(cart.ui.updateCartSubTotal).toHaveBeenCalledWith(14.99);
        expect(cart.ui.updateCartQuantity).toHaveBeenCalledWith(1);
        expect(cart.ui.hideLoader).toHaveBeenCalledWith(24);
    });
    test("Should delete product if quantity is 1", () => {
        const updatedProduct = {
            id: 24,
            title: "Fish Steak",
            price: 0.0,
            quantity: 0,
            total: 0.0,
            discountPercentage: 4.23,
            discountedTotal: 0.0,
            thumbnail: "test",
        };
        jest.spyOn(cart.service, "decreaseQuantity").mockReturnValue(updatedProduct);
        const updatedCart = {
            ...mockData,
            products: [updatedProduct],
            discountedTotal: 0.0,
            total: 0.0,
            totalQuantity: 0,
        };
        const deleteSpy = jest.spyOn(cart, "deleteProducts").mockImplementation();
        jest.spyOn(cart.service, "getCart").mockReturnValue(updatedCart);
        cart.decreaseQuantity(24);
        expect(deleteSpy).toHaveBeenCalledWith(24);
    });
    test("Should log error if quantity decreasing fails", () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        jest.spyOn(cart.service, "decreaseQuantity").mockImplementation(() => {
            throw new Error("Product to be updated not found");
        });
        cart.decreaseQuantity(999);
        expect(consoleSpy).toHaveBeenCalledWith(new Error("Product to be updated not found"));
    });
    test("Should delete product if given quantity is 0", () => {
        const deleteSpy = jest.spyOn(cart, "deleteProducts").mockImplementation();
        cart.changeQuantity(24, 0);
        expect(deleteSpy).toHaveBeenCalledWith(24);
    });
    test("Should change quantity of product with given value", () => {
        const updatedProduct = {
            id: 24,
            title: "Fish Steak",
            price: 14.99,
            quantity: 2,
            total: 29.98,
            discountPercentage: 4.23,
            discountedTotal: 28.72,
            thumbnail: "test",
        };
        jest.spyOn(cart.service, "changeQuantity").mockReturnValue(updatedProduct);
        const updatedCart = {
            ...mockData,
            products: [updatedProduct],
            discountedTotal: 28.72,
            total: 29.98,
            totalQuantity: 2,
        };
        jest.spyOn(cart.service, "getCart").mockReturnValue(updatedCart);
        cart.changeQuantity(24, 2);
        expect(cart.service.changeQuantity).toHaveBeenCalledWith(24, 2);
        expect(cart.ui.updateQuantity).toHaveBeenCalledWith(24, 2);
        expect(cart.ui.updateTotal).toHaveBeenCalledWith(24, "29.98");
        expect(cart.ui.updateCartTotal).toHaveBeenCalledWith(29.98);
        expect(cart.ui.updateCartSubTotal).toHaveBeenCalledWith(29.98);
        expect(cart.ui.updateCartQuantity).toHaveBeenCalledWith(2);
        expect(cart.ui.hideLoader).toHaveBeenCalledWith(24);
    });
    test("Should log error if changing quantity  fails", () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        jest.spyOn(cart.service, "changeQuantity").mockImplementation(() => {
            throw new Error("Product to be updated not found");
        });
        cart.decreaseQuantity(999);
        expect(consoleSpy).toHaveBeenCalledWith(new Error("Product to be updated not found"));
    });
    test("Should delete product", () => {
        // const updatedProduct: Product = {
        //     id: 24,
        //     title: "Fish Steak",
        //     price: 0.0,
        //     quantity: 0,
        //     total: 0.0,
        //     discountPercentage: 4.23,
        //     discountedTotal: 0.0,
        //     thumbnail: "test",
        // };
        jest.spyOn(cart.service, "deleteProducts").mockReturnValue();
        const updatedCart = {
            ...mockData,
            products: [],
            discountedTotal: 0.0,
            total: 0.0,
            totalQuantity: 0,
        };
        jest.spyOn(cart.service, "getCart").mockReturnValue(updatedCart);
        cart.deleteProducts(24);
        expect(cart.ui.updateCartTotal).toHaveBeenCalledWith(0);
        expect(cart.ui.updateCartSubTotal).toHaveBeenCalledWith(0);
        expect(cart.ui.updateCartQuantity).toHaveBeenCalledWith(0);
        expect(cart.ui.deleteProductBox).toHaveBeenCalledWith(24);
    });
    test("Should log error if deleting product fails", () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        jest.spyOn(cart.service, "deleteProducts").mockImplementation(() => {
            throw new Error("Product to be deleted not found");
        });
        cart.decreaseQuantity(999);
        expect(consoleSpy).toHaveBeenCalledWith(new Error("Product to be updated not found"));
    });
});
//# sourceMappingURL=ShoppingCart.test.js.map