const expressAsyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

const saveNotification = expressAsyncHandler(async (req, res) => {
    const { sender, chat } = req.body;
    if (!sender || !chat) {
        res.status(400);
        throw new Error("Please provide all the details");
    }

    var newNotification = {
        sender: sender,
        chat: chat,
    };

    try {
        var notification = await Notification.create(newNotification);
        res.json(notification);
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
    }
});

const getNotification = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400);
        throw new Error("Please provide userId");
    }
    try {
        var notifications = await Notification.find({ sender: userId }).populate("chat");
        res.json(notifications);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}
);

const deleteNotification = expressAsyncHandler(async (req, res) => {
    const notificationId = req.params.notificationId;
    if (!notificationId) {
        res.status(400);
        throw new Error("Please provide notificationId");
    }
    try {
        var notification = await Notification.findByIdAndDelete(notificationId);
        res.json(notification);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}
);


module.exports = { saveNotification, getNotification , deleteNotification };