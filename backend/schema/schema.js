import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        default: null,
    },
    picture: {
        type: String,
        required: false,
        default: null,
    },
    documents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
        },
    ],
});

const documentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: 'Untitled',
    },
    data: {
        type: Object,
        required: false,
        default: {},
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    owner: {
        type: String,
        ref: 'User',
    },
    collaborators: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        cursorPosition: Number,
    },
  ],
});

export const User = mongoose.model('User', userSchema);
export const Document = mongoose.model('Document', documentSchema);

