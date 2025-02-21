import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) =>{
    const cart = await cartManager.add();
    res.status(201).json(cart);
});

router.get('/:cid', async (req, res) =>{
    const cart = await cartManager.getById(Number(req.params.cid));
    cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) =>{
    const cart = await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
    cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

export default router;