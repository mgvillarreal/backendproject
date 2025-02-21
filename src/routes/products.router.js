import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await productManager.getAll();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getById(Number(req.params.pid));
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
    const product = await productManager.add(req.body);
    res.status(201).json(product);
});

router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.update(Number(req.params.pid), req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).send('Producto no encontrado');
});

router.delete('/:pid', async (req, res) => {
    await productManager.delete(Number(req.params.pid));
    res.sendStatus(204);
});

export default router;