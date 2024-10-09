import { Document } from '../models/documents.js';

// Crear (Subir) un documento
export const uploadDocument = async (req, res) => {
    try {
        const { idproperty, iduser } = req.body;
        console.log(req.body);
        console.log(idproperty, iduser);

        if (!req.file) {
            return res.status(400).json({ message: 'Por favor, suba un archivo.' });
        }

        const document = new Document({
            idproperty,
            iduser,
            fileUrl: `/uploads/documents/${req.file.filename}`,
            fileType: req.file.mimetype.split('/')[1]
        });

        await document.save();
        res.status(201).json({ message: 'Documento subido con éxito.', document });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir el documento.', error });
    }
};

// Leer todos los documentos
export const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los documentos.', error });
    }
};

// Leer un documento por ID
export const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Documento no encontrado.' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el documento.', error });
    }
};

// Actualizar un documento por ID
export const updateDocument = async (req, res) => {
    try {
        const { idproperty, iduser } = req.body;

        // Preparamos el objeto de actualización con los campos que han cambiado
        let updateFields = {
            idproperty,
            iduser,
        };

        // Si hay un nuevo archivo subido, también lo añadimos al objeto de actualización
        if (req.file) {
            updateFields.fileUrl = `/uploads/documents/${req.file.filename}`;
            updateFields.fileType = req.file.mimetype.split('/')[1];
        }

        // Usamos findByIdAndUpdate para actualizar el documento
        const updatedDocument = await Document.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields }, // Establecemos los campos a actualizar
            { new: true } // Devolvemos el documento actualizado
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: 'Documento no encontrado.' });
        }

        res.status(200).json({ message: 'Documento actualizado con éxito.', document: updatedDocument });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el documento.', error });
    }
};


// Eliminar un documento por ID
export const deleteDocument = async (req, res) => {
    try {
        const deletedDocument = await Document.findByIdAndDelete(req.params.id);
        if (!deletedDocument) return res.status(404).json({ message: 'Documento no encontrada' });
        res.status(200).json({ message: 'Documento eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el documento.', error });
    }
};
