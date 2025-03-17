import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) =>{
    try{
        const products = await productManager.getAll();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
});

router.get('/:pid', async (req, res) =>{
    try{
        const product = await productManager.getById(Number(req.params.pid));
        res.setHeader('Content-Type', 'application/json');
        product ? res.json(product) : res.status(404).send('Producto no encontrado');
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
    
});

router.post('/', async (req, res) =>{
    try{
        const product = await productManager.add(req.body);
        res.setHeader('Content-Type', 'application/json');
        if(product != null){
            res.status(201).json(product);
        }else{
            res.status(409).send('Código ya existe');
        }
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
    
});

router.put('/:pid', async (req, res) =>{
    try{
        const updatedProduct = await productManager.update(Number(req.params.pid), req.body);
        res.setHeader('Content-Type', 'application/json');
        updatedProduct ? res.json(updatedProduct) : res.status(404).send('Producto no encontrado');
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
});

router.delete('/:pid', async (req, res) =>{
    try{
        await productManager.delete(Number(req.params.pid));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send('Producto eliminado con éxito');
    } catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Internal server error.'});
    }
    
});

export default router;