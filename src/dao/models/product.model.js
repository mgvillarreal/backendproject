import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true 
        },
        thumbnail: {
            type: [String],
            required: true
        },
        stock: {
            type: Number,
            required: true 
        },
        category: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
    },
    { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model(
    "Products",
    productsSchema
);