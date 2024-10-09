import mongoose from "mongoose";
const { Schema, model } = mongoose;

const propertySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
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
  price: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al dueño actual del inmueble
    required: true
  },
  images: [String], // URLs de las imágenes del inmueble
  size: {
    type: Number, // Tamaño del inmueble (en metros cuadrados, por ejemplo)
    required: true
  },
  isForSale: {
    type: Boolean,
    default: true
  },
  isVerify: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Property = model("property", propertySchema)