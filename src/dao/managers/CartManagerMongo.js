import { cartModel } from '../models/cart.model.js';
import { productModel } from '../models/product.model.js';

export default class CartManager{
    async getAll() {
        return await Cart.find().populate('products.product');
    }
  
    async getById(id) {
        return await Cart.findById(id).populate('products.product');
    }
  
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
}

//module.exports = CartManager;