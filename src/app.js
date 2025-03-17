import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import ProductManager from './managers/ProductManager.js';
import { engine } from 'express-handlebars';

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true }));

const productManager = new ProductManager('./src/data/products.json');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', async (req, res) =>{
    try{
        const products = await productManager.getAll();
        res.render('home', {products});
    } catch(error){
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});