import Product from "../models/product.model.js";

export default class ProductManager{
    async getAll() {
        return await Product.find();
    }

    async getAllPaginated({ limit = 10, page = 1, query = {}, sort }) {
        const options = {
          page,
          limit,
          sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined
        };
    
        return await Product.paginate(query, options);
    }

    async getById(id) {
        return await Product.findById(id);
    }

    async add(productData) {
        return await Product.create(productData);
    }

    async update(id, updatedData) {
        return await Product.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

//module.exports = ProductManager;