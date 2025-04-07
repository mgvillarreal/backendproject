import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';

export default class CartManager{
    async getAll() {
        return await Cart.find().populate('products.product');
    }
  
    /*async getById(id) {
        return await Cart.findById(id).populate('products.product');
    }*/
  
    async add() {
        const newCart = { products: [] };
        return await Cart.create(newCart);
    }
  
    async addProductToCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Cart not found');
    
        const productIndex = cart.products.findIndex(p => p.product.equals(productId));
    
        if (productIndex !== -1) {
            // Ya está el producto, aumentar la cantidad
            cart.products[productIndex].quantity += 1;
        } else {
            // No está, agregar nuevo
            cart.products.push({ product: productId, quantity: 1 });
        }
  
      return await cart.save();
    }

    async getByIdWithPopulate(cid) {
        return await Cart.findById(cid).populate('products.product');
        
    }

    async removeProduct(cid, pid) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;
      
        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        return cart;
    }

    async updateCart(cid, newProducts) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;
      
        cart.products = newProducts.map(p => ({
            product: p.product,
            quantity: p.quantity || 1
        }));
      
        await cart.save();
        return cart;
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;
      
        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (!productInCart) return null;
      
        productInCart.quantity = quantity;
        await cart.save();
        return cart;
    }

    async clearCart(cid) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;
      
        cart.products = [];
        await cart.save();
        return cart;
    }
}

//module.exports = CartManager;