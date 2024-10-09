import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const documentSchema = new Schema({
    idproperty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    iduser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    fileType: {
        type: String,
        enum: ['pdf', 'doc', 'docx'],
        required: true
    }
});

export const Document = model('Document', documentSchema);
