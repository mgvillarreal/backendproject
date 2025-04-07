import ProductModel from "../models/product.model.js";

export default class ProductManager{
    async getAll() {
        return await ProductModel.find();
    }

    async getAllPaginated({ limit = 10, page = 1, query = {}, sort }) {
        const options = {
          page,
          limit,
          sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
          lean: true
        };
    
        return await ProductModel.paginate(query, options);
    }

    async getById(id) {
        return await ProductModel.findById(id).lean();
    }

    async add(productData) {
        return await ProductModel.create(productData);
    }

    async update(id, updatedData) {
        return await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

//module.exports = ProductManager;