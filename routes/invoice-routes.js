const express = require('express');
const invoiceController = require('../controller/invoice-controller');

const router = express.Router();

router.get('/all-invoices', invoiceController.getAllInvoice);
router.post('/create-invoice', invoiceController.createInvoice);
router.get('/invoice/:invId', invoiceController.getInvoiceById);

module.exports = router;