import mongoose from "mongoose";
const {Schema, model} = mongoose;

const transactionSchema = new Schema({
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property', // Referencia al inmueble asociado
      required: true
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al comprador
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al vendedor
      required: true
    },
    transactionHash: {
      type: String, // Hash de la transacción en la blockchain
      required: true
    },
    amount: {
      type: Number, // Monto de la transacción
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'], // Estado de la transacción
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
  });

  export const Transaction = model("transaction", transactionSchema)