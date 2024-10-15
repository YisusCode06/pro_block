// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Necesitas estas dos líneas para obtener el __dirname en ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configurar la ubicación de almacenamiento y nombre del archivo
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../public/uploads/documents')); // Carpeta donde se almacenarán los archivos
//     },
//     filename: (req, file, cb) => {
//         const now = new Date();
//         const timeStamp = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
//         const originalName = path.parse(file.originalname).name; // Obtener solo el nombre del archivo sin la extensión
//         const extension = path.extname(file.originalname); // Obtener la extensión del archivo
//         const uniqueName = `${originalName}-${timeStamp}${extension}`; // Generar el nombre único
//         cb(null, uniqueName);
//     }
// });

// // Filtrar los tipos de archivos permitidos (PDF y Word)
// const fileFilter = (req, file, cb) => {
//     const filetypes = /pdf|doc|docx/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Solo se permiten archivos PDF y Word.'));
//     }
// };

// // Middleware de multer
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // Limitar a 10MB
//     fileFilter: fileFilter
// });

// export default upload;

// middlewares/upload.documents.middleware.js
// middlewares/upload.documents.middleware.js
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';

// Configuración de Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// Middleware de Multer para manejar la carga del archivo
const upload = multer({ storage: multer.memoryStorage() }); // Guardamos los archivos en memoria

// Función para subir el archivo a Cloudinary usando un stream
const uploadToCloudinary = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Por favor, suba un archivo.' });
    }

    // Asegúrate de que el nombre del archivo tenga la extensión .pdf
    const fileName = req.file.originalname.replace(/\.[^/.]+$/, ""); // Quitar la extensión actual
    const newFileName = `${fileName}.pdf`; // Añadir la extensión .pdf

    const stream = cloudinary.uploader.upload_stream(
        { 
            folder: 'documents', // Carpeta donde se guardarán los documentos en Cloudinary
            resource_type: 'raw', // Indicar que se está subiendo un archivo en bruto
            public_id: newFileName, // Establecer el ID público con la extensión correcta
        
        }, 
        (error, result) => {
            if (error) {
                console.error('Error al subir a Cloudinary:', error);
                return res.status(500).json({ message: 'Error al subir el archivo.', error });
            }

            // Guardar la URL del archivo subido en la solicitud
            req.file.cloudinaryUrl = result.secure_url; // URL de acceso al PDF
            req.file.fileType = req.file.mimetype; // Asegúrate de que fileType se asigne correctamente

            console.log('Archivo subido con éxito:', result);

            // Continuar al siguiente middleware o controlador
            next();
        }
    );

    // Convertimos el archivo en un stream para subirlo
    streamifier.createReadStream(req.file.buffer).pipe(stream);
};


// Exportamos el middleware de multer y la función para subir a Cloudinary
export { upload, uploadToCloudinary };
