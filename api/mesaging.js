const express = require('express');
const router = express.Router();

const messagingController = require('../controllers/messagingController.js');

router.post('/', messagingController);

module.exports = router;
