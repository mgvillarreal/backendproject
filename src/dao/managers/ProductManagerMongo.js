import { ProductModel } from "../models/product.model.js";

export default class ProductManager{
    async getAll() {
        return await Product.find();
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