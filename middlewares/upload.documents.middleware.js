import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesitas estas dos líneas para obtener el __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar la ubicación de almacenamiento y nombre del archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/documents')); // Carpeta donde se almacenarán los archivos
    },
    filename: (req, file, cb) => {
        const now = new Date();
        const timeStamp = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
        const originalName = path.parse(file.originalname).name; // Obtener solo el nombre del archivo sin la extensión
        const extension = path.extname(file.originalname); // Obtener la extensión del archivo
        const uniqueName = `${originalName}-${timeStamp}${extension}`; // Generar el nombre único
        cb(null, uniqueName);
    }
});

// Filtrar los tipos de archivos permitidos (PDF y Word)
const fileFilter = (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos PDF y Word.'));
    }
};

// Middleware de multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limitar a 10MB
    fileFilter: fileFilter
});

export default upload;
