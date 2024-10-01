import express from 'express';
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from '../controllers/properties.controller.js';

const routerProperty = express.Router();

routerProperty.post('/', createProperty);
routerProperty.get('/', getAllProperties);
routerProperty.get('/:id', getPropertyById);
routerProperty.put('/:id', updateProperty);
routerProperty.delete('/:id', deleteProperty);

export default routerProperty;
