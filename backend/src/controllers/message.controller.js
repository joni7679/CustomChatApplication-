const messageModel = require("../models/Message.model");

exports.sendMessage = async (req, res) => {
    try {
        const { text, sender, senderId, receiverId, conversationId } = req.body;
        const message = await messageModel.create({
            text,
            sender,
            senderId,
            receiverId,
            conversationId
        })
        res.status(201).json({
            message: "message send successfully!",
            data: message
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to post message",
        })
    }
}

exports.getMessageByConversationId = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const message = await messageModel.find({ conversationId }).sort({ createdAt: 1, })

        if (!message) {
            res.status(400).json({
                message: "try.."
            })
        }
        res.status(200).json({
            success: true,
            message: "message fetch successfully",
            data: message
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}