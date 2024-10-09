import { Router } from 'express';
import { uploadDocument, getAllDocuments, getDocumentById, updateDocument, deleteDocument } from '../controllers/document.controller.js';
import upload from '../middlewares/upload.documents.middleware.js';

const routerDocument = Router();

// Crear un documento
routerDocument.post('/upload', upload.single('file'), uploadDocument);

// Obtener todos los documentos
routerDocument.get('/', getAllDocuments);

// Obtener un documento por ID
routerDocument.get('/:id', getDocumentById);

// Actualizar un documento por ID
routerDocument.put('/:id', upload.single('file'), updateDocument);

// Eliminar un documento por ID
routerDocument.delete('/:id', deleteDocument);

export default routerDocument;
