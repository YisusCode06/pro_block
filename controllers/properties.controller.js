import { Property } from "../models/property.js";

// Crear una nueva propiedad
export const createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    console.log(newProperty);
    await newProperty.save();
    res.status(201).json({ message: 'Propiedad creada con éxito', property: newProperty });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la propiedad', error });
  }
};

// Obtener todas las propiedades
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las propiedades', error });
  }
};

// Obtener una propiedad por ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Propiedad no encontrada' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la propiedad', error });
  }
};

// Actualizar una propiedad
export const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProperty) return res.status(404).json({ message: 'Propiedad no encontrada' });
    res.status(200).json({ message: 'Propiedad actualizada', property: updatedProperty });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la propiedad', error });
  }
};

// Eliminar una propiedad
export const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) return res.status(404).json({ message: 'Propiedad no encontrada' });
    res.status(200).json({ message: 'Propiedad eliminada', property: deletedProperty });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la propiedad', error });
  }
};