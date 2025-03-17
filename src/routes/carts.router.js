import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) =>{
    try{
        const cart = await cartManager.add();
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(cart);
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
    
});

router.get('/:cid', async (req, res) =>{
    try{
        const cart = await cartManager.getById(Number(req.params.cid));
        res.setHeader('Content-Type', 'application/json');
        cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
});

router.post('/:cid/product/:pid', async (req, res) =>{
    try{
        const cart = await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
        res.setHeader('Content-Type', 'application/json');
        res.status(cart.status).json({ message: cart.message, cart: cart.cart || null });
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
});

export default router;