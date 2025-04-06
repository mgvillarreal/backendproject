import mongoose from "mongoose";

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

export const ProductModel = mongoose.model(
    "products",
    productsSchema
);