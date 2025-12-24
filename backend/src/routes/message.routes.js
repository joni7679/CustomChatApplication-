const express = require("express");
const messageModel = require("../models/Message.model");
const { sendMessage, getMessageByConversationId } = require("../controllers/message.controller");
const router = express.Router();

router.post('/message', sendMessage)

router.get('/message/:conversationId',getMessageByConversationId)


module.exports = router