import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer'
    },
    walletAddress: {
        type: String,
        required: true
    },
    propertiesOwned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = model("user", userSchema)