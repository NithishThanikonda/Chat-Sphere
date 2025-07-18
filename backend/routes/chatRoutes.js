const express = require('express');
const router = express.Router();
const {accessChat,getChats,createGroup,renameGroup,removeFromGroup,addToGroup} = require('../controllers/chatController');
const {protect} = require('../middleware/authMiddleware');


router.route('/').post(protect,accessChat);
router.route('/').get(protect,getChats);
router.route('/group').post(protect,createGroup);
router.route('/rename').put(protect,renameGroup);
router.route('/removeFromGroup').put(protect,removeFromGroup);
router.route('/addToGroup').put(protect,addToGroup);

module.exports = router;