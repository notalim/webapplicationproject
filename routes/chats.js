import { Router } from "express";
const router = Router();
import { chatData, userData } from "../data/index.js";
import * as validation from "../validation.js";

// TODO: Chat Routes

// TODO: GET /chats/:uid - Get All chats for user/aCenter with id
router.route("/:uid").get(async (req, res) => {
    const id = validation.checkId(req.params.uid);
    try{
        const chatList = await chatData.getAllChatsUser(id);
        res.status(200).json(chatList);
    }catch(e){
        res.status(500).json({error: e});
    }
});

router.route("/:acid").get(async (req, res) => {
    const id = validation.checkId(req.params.acid);
    try{
        const chatList = await chatData.getAllChatsACenter(id);
        res.status(200).json(chatList);
    }catch(e){
        res.status(500).json({error: e});
    }
});

// TODO: GET /chats/:uid/:acid - Get chat for user between it and aCenter
router.route("/:uid/:acid").get(async (req, res) => {
    const uid = validation.checkId(req.params.uid);
    const acid = validation.checkId(req.params.acid);
    try{
        const chat = await chatData.getChat(uid,acid);
        res.status(200).json(chat);
    }catch(e){
        res.status(500).json({error: e});
    }
});

// TODO: GET /chats/:acid/:uid - Get chat for aCenter between it and user
router.route("/:acid/:uid").get(async (req, res) => {
    const uid = validation.checkId(req.params.uid);
    const acid = validation.checkId(req.params.acid);
    try{
        const chat = await chatData.getChat(uid,acid);
        res.status(200).json(chat);
    }catch(e){
        res.status(500).json({error: e});
    }
});

// TODO: PUT /chats/:acid/:uid - Sending a message from aCenter to user
router.route("/:acid/:uid").put(async (req, res) => {
    const uid = validation.checkId(req.params.uid);
    const acid = validation.checkId(req.params.acid);
    const message = validation.checkMessage(req.body.message);
    const time = req.body.time;
    try{
        const newMessage = await chatData.postMessage(
            uid,
            acid,
            acid,
            message,
            time
        );
        res.status(200).json({message: newMessage, sender: uid});
    }catch(e){
        res.status(500).json({error: e});
    }
});

// TODO: PUT /chats/:uid/:acid - Sending a message from user to aCenter
router.route("/:uid/:acid").put(async (req, res) => {
    const uid = validation.checkId(req.params.uid);
    const acid = validation.checkId(req.params.acid);
    const message = validation.checkMessage(req.body.message);
    const time = req.body.time;
    try{
        const newMessage = await chatData.postMessage(
            uid,
            acid,
            uid,
            message,
            time
        );
        res.status(200).json({message: newMessage, sender: uid});
    }catch(e){
        res.status(500).json({error: e});
    }
});

// TODO: POST /chats/:uid/:acid - Creating a chat between user and aCenter
router.route("/:uid/:acid").post(async (req, res) => {
    const uid = validation.checkId(req.params.uid);
    const acid = validation.checkId(req.params.acid);
    try{
        const chat = chatData.getChat(uid, acid);
        res.status(400).json({foundChat: chat});
    }catch(e){

    }
    try{
        const newChat = chatData.createChat(uid, acid);
        res.status(200).json({Chat: newChat});
    }catch(e){
        res.status(500).json({error: e});
    }
});

export default router;

