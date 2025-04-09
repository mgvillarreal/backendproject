import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import ProductManager from './dao/managers/ProductManagerMongo.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import { config } from './config/config.js';
import mongoose from "mongoose";

const app = express();

const productManager = new ProductManager;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views','./src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => console.log('Servidor escuchando en http://localhost:8080'));
const io = new Server(httpServer);
app.set('socketio', io);


/* ------------------- view ------------------- */ //SEGUNDA PREENTREGA
app.get('/', async (req, res) =>{
    try{
        const products = await productManager.getAll();
        res.render('home', {products});
    } catch(error){
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

/* ------------------- socket.io ------------------- */ //SEGUNDA PREENTREGA
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    const products = await productManager.getAll();
    socket.emit('actualizarProductos', products);

    socket.on('nuevoProducto', async (producto) => {
        await productManager.add(producto);
        const productosActualizados = await productManager.getAll();
        io.emit('actualizarProductos', productosActualizados); 
    });

    socket.on('eliminarProducto', async (id) => {
        await productManager.delete(parseInt(id));
        const productosActualizados = await productManager.getAll();
        io.emit('actualizarProductos', productosActualizados);
    });
});

/* ------------------- Mongoose ------------------- */
const connectDB = async(uriMongoDB, dbName)=>{
    try{
        await mongoose.connect(
            config.MONGO_URL,
            {
                dbName: config.DB_NAME
            }
        )
        console.log("Mongo Data Base connected!");
    } catch(error){
        console.error(`Error connecting to Mongo Data Base. ${error.message}`);
    }
}
connectDB();
