import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';

export default class CartManager{
    async getAll() {
        return await CartModel.find().populate('products.product');
    }
  
    async getById(id) {
        const cart = await CartModel.findById(id).populate('products.product').lean();
        if (!cart) throw new Error('Cart not found');
    }
  
    async add() {
        const newCart = { products: [] };
        return await CartModel.create(newCart);
    }
  
    async addProductToCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        const product = await ProductModel.findById(productId);
        if (!product) throw new Error("Product not found. Try with another product");
    
        const productIndex = cart.products.findIndex(p => p.product.equals(productId));
    
        if (productIndex !== -1) { //Producto existe en el carrito, aumenta la cantidad
            cart.products[productIndex].quantity += 1;
        } else { //Producto no está, agrega nuevo
            cart.products.push({ product: productId, quantity: 1 });
        }
  
      return await cart.save();
    }

    async removeProduct(cid, pid) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;
      
        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        return cart;
    }

    async updateCart(cid, newProducts) {
        const cart = await CartModel.findById(cid);
        if (!cart) throw new Error('Cart not found');

        const product = await ProductModel.findById(productId);
        if (!product) throw new Error("Product not found. Try with another product");
      
        cart.products = newProducts.map(p => ({
            product: p.product,
            quantity: p.quantity || 1
        }));
      
        await CartModel.save();
        return cart;
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;
      
        const productInCart = CartModel.products.find(p => p.product.toString() === pid);
        if (!productInCart) return null;
      
        productInCart.quantity = quantity;
        await cart.save();
        return cart;
    }

    async clearCart(cid) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;
      
        cart.products = [];
        await cart.save();
        return cart;
    }
}

//module.exports = CartManager;