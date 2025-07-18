const mongoose = require('mongoose')

const notificationModel = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
},
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", notificationModel);
module.exports = Notification;