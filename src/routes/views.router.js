import { Router } from "express";
import ProductManager from "../dao/managers/ProductManagerMongo.js";

const router = Router();
const productManager = new ProductManager();

router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const result = await productManager.getAllPaginated({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query,
    });
  
    res.render('products', {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      currentPage: result.page,
    });
});

router.get('/products/:pid', async (req, res) => {
    const product = await productManager.getById(req.params.pid);
    if (!product) return res.status(404).render('404');
  
    res.render('productDetail', { product });
});

/*router.get("/", async (req, res) => { //SEGUNDA PREENTREGA
    try {
        const products = await productManager.getAll();
        res.render("home", {products});
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error interno del servidor");
    }
});*/

router.get("/realtimeproducts", async (req, res) => { //SEGUNDA PREENTREGA
    try {
        const products = await productManager.getAll();
        res.render("realTimeProducts", {products});
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default router;