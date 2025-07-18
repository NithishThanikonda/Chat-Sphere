const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const { saveNotification, getNotification, deleteNotification } = require('../controllers/notificationController');

router.route('/').post(protect,saveNotification);
router.route('/:userId').get(protect,getNotification);
router.route('/:notificationId').delete(protect,deleteNotification);

module.exports = router;