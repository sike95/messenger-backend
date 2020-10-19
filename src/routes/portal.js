const express = require('express');
const portalController = require('../controllers/portal');

const router = express.Router();

router.get('/customers', portalController.getCustomers);
router.get('/customer/messages/:id', portalController.getCustomerMessages);
module.exports = router;