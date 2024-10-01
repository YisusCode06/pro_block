import mongoose from "mongoose";
const {Schema, model} = mongoose;

const contractSchema = new Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contractAddress: {
        type: String, // Dirección del contrato inteligente en la blockchain Tezos
        required: true
    },
    terms: {
        type: String, // Términos del contrato
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Contract = model("contract", contractSchema)