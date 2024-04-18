const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    brandName: {type: String, required: true},
    brandAddress: {type: String, required: true},
    brandGST: {type: String, required: true},
    description: {type: String, required: true},
    totalAmount: {type: String, required: true},
    influencerName: {type: String, required: true},
    paymentDetails: {
        name: {type: String, required: true},
        billingAddress: {type: String, required: false},
        panNo: {type: String, required: true},
        bankDetails: {
            accountHolderName: {type: String, required: true},
            accountNumber: {type: String, required: true},
            bankName: {type: String, required: true},
            ifscCode: {type: String, required: true}
        }
    },
    invoiceDate: {type: String, required: true}
});

module.exports = mongoose.model('Invoice', invoiceSchema);

