import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    { timestamps: true }
);

const CartModel = mongoose.model(
    "Carts",
    cartsSchema
);

export default CartModel;