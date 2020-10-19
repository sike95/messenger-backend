const express = require('express');
const webHookController = require('../controllers/webhook.contoller');

const router = express.Router();

router.get('/webhook', webHookController.getWebHook);
router.post('/webhook', webHookController.createWebHook);

module.exports = router;