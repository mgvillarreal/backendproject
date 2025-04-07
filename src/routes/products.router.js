import { Router } from 'express';
import ProductManager from '../dao/managers/ProductManagerMongo.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) =>{
    try{
        //const products = await productManager.getAll();
        //res.status(200).json(products);

        const { limit = 10, page = 1, sort, query } = req.query;

        let parsedQuery = {};
        if (query) {
            const [field, value] = query.split(':');
            parsedQuery[field] = value;
        }

        const result = await productManager.getAllPaginated({
            limit: parseInt(limit),
            page: parseInt(page),
            query: parsedQuery,
            sort
        });

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage
                ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`
                : null,
            nextLink: result.hasNextPage
                ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`
                : null
        });

    } catch(error){
        console.error("Error getting products", error);
        res.status(500).json({error: 'Internal server error.'});
    }
});

router.get('/:pid', async (req, res) =>{
    try{
        const product = await productManager.getById(req.params.pid);
        if (product) {
            res.json(product);
            } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch(error){
        res.status(500).json({error: 'Internal server error.'});
    }
    
});

router.post('/', async (req, res) =>{
    try{
        const product = await productManager.add(req.body);
        res.status(201).json(product);
    } catch(error){
        if (error.code === 11000) {
            res.status(409).json({ error: 'Code already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
    
});

router.put('/:pid', async (req, res) =>{
    try{
        const updatedProduct = await productManager.update(req.params.pid, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch(error){
        res.status(500).json({error: 'Internal server error.'});
    }
});

router.delete('/:pid', async (req, res) =>{
    try{
        const deletedProduct = await productManager.delete(req.params.pid);
        if (deletedProduct) {
            res.status(200).json({ message: 'Product succesfully deleted' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch(error){
        res.status(500).json({error: 'Internal server error.'});
    }
    
});

export default router;