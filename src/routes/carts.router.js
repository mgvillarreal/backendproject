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
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch(error){
        res.status(500).json({error: 'Internal server error.'});
    }
});

router.post('/:cid/product/:pid', async (req, res) =>{
    try{
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        res.status(200).json({ message: 'Product added to cart', cart: updatedCart });
    } catch(error){
        if (error.message === 'Cart not found') {
            res.status(404).json({ error: 'Cart not found' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
});

export default router;