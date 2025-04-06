import fs from 'fs/promises';
const path = './src/data/products.json';

export default class ProductManager{
    async getAll(){
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    }

    async getById(id){
        const products = await this.getAll();
        const product = products.find(p => p.id === id);

        if (!product) console.error('Producto no encontrado.');
        return product;
    }

    async add(product){
        const { title, description, price, thumbnail, code, stock, category, status = true } = product;

        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            console.error('Todos los campos son obligatorios.');
            return null;
        }

        const products = await this.getAll();
        if (products.some(p => p.code === code)) {
            console.error('El código ya existe.');
            return null;
        }

        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status
        };
        products.push(newProduct);

        await fs.writeFile(path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async update(id, updatedProduct) {
        const products = await this.getAll();
        const index = products.findIndex(p => p.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct, id };
            await fs.writeFile(path, JSON.stringify(products, null, 2));
            return products[index];
        }
        console.error('Producto no encontrado.');
        return null;
    }

    async delete(id) {
        const products = await this.getAll();
        const filteredProducts = products.filter(p => p.id !== id);
        await fs.writeFile(path, JSON.stringify(filteredProducts, null, 2));
        return id;
    }
}