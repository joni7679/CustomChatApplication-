const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        enum: ["user", "admin"],
        required: true,
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    conversationId: {
        type: String,
        required: true
    }

}, { timestamps: true });

const messageModel = mongoose.model('massage', messageSchema);
module.exports = messageModel