import { Router } from 'express';
import CartManager from '../dao/managers/CartManagerMongo.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) =>{
    try{
        const cart = await cartManager.add();
        res.status(201).json(cart);
    } catch(error){
        res.status(500).json({error: 'Internal server error.'});
    }
    
});

router.get('/:cid', async (req, res) =>{
    try{
        const cart = await cartManager.getById(req.params.cid);
        if (cart) {
            res.json(cart);
        } /*else {
            res.status(404).json({ error: 'Cart not found' });
        }*/
    } catch(error){
        if (error.message) { 
            res.status(404).json({ error: 'Cart not found' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
});

router.post('/:cid/product/:pid', async (req, res) =>{
    try{
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        res.status(200).json({ message: 'Product added to cart', cart: updatedCart });
    } catch(error){
        if (error.message) { 
            res.status(404).json({ error: 'Cart or product not found' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
});

// 🆕 Eliminar producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const result = await cartManager.removeProduct(req.params.cid, req.params.pid);
        if (result) {
            res.json({ message: 'Product deleted from cart' });
        } else {
            res.status(404).json({ error: 'Cart or product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  // 🆕 Actualizar TODOS los productos del carrito
  router.put('/:cid', async (req, res) => {
    try {
        const { products } = req.body;
        const updatedCart = await cartManager.updateCart(req.params.cid, products);
        res.json({ message: 'Cart updated', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  // 🆕 Actualizar cantidad de un producto específico en el carrito
  router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
        res.json({ message: 'Quantity updated', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  // 🆕 Eliminar todos los productos del carrito
  router.delete('/:cid', async (req, res) => {
    try {
        const result = await cartManager.clearCart(req.params.cid);
        if (result) {
            res.json({ message: 'Cart correctly emptied' });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
  });

export default router;