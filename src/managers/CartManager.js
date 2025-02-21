import fs from 'fs/promises';
const path = './src/data/carts.json';

export default class CartManager {
    async getAll() {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    }

    async getById(id) {
        const carts = await this.getAll();
        return carts.find(c => c.id === id);
    }

    async add() {
        const carts = await this.getAll();
        const newCart = { id: carts.length ? carts[carts.length - 1].id + 1 : 1, products: [] };
        carts.push(newCart);
        await fs.writeFile(path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getAll();
        const cart = carts.find(c => c.id === cartId);
        if (cart) {
            const product = cart.products.find(p => p.id === productId);
            if (product) {
                product.quantity += 1;
            } else {
                cart.products.push({ id: productId, quantity: 1 });
            }
            await fs.writeFile(path, JSON.stringify(carts, null, 2));
            return cart;
        }
        return null;
    }
}