import { Document } from '../models/documents.js';

// Crear (Subir) un documento
export const uploadDocument = async (req, res) => {
    try {
        console.log('Datos del cuerpo:', req.body); // Para depuración
        console.log('Archivo recibido:', req.file); // Para depuración

        const newDocument = new Document({
            idproperty: req.body.idproperty,
            iduser: req.body.iduser,
            fileUrl: req.file.cloudinaryUrl, // Almacenar la URL del archivo en fileUrl
            fileType: req.file.fileType.split('/')[1] // Almacenar solo la extensión del archivo
        });

        const savedDocument = await newDocument.save();

        return res.status(201).json(savedDocument);
    } catch (error) {
        console.error('Error al subir el documento:', error);
        return res.status(500).json({ message: 'Error al subir el documento.', error });
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
// Actualizar un documento por ID
export const updateDocument = async (req, res) => {
    try {
        const { idproperty, iduser } = req.body;

        // Verifica que al menos uno de los campos necesarios esté presente
        if (!idproperty && !iduser && !req.file) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar.' });
        }

        // Preparamos el objeto de actualización con los campos que han cambiado
        let updateFields = {};

        // Solo actualizamos los campos si están presentes en el cuerpo de la solicitud
        if (idproperty) {
            updateFields.idproperty = idproperty;
        }

        if (iduser) {
            updateFields.iduser = iduser;
        }

        // Si hay un nuevo archivo subido, también lo añadimos al objeto de actualización
        if (req.file) {
            updateFields.fileUrl = req.file.cloudinaryUrl; // Almacena la URL del archivo en fileUrl
            updateFields.fileType = req.file.fileType; // Guarda el tipo de archivo si es necesario
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
        console.error('Error al actualizar el documento:', error); // Para depuración
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
