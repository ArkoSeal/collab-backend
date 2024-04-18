// const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const Invoice = require('../models/invoice');

const dummyInv = [
    {
        id:'as12',
        brandName: 'JUST DOGS',
        brandAddress: 'JUST DOGS SPALONS PVT LTD, FIrst floor 1-A, satykaam society',
        brandGST: '24AADCJ2134J1ZU',
        description: 'Reel for DOGUST Sale',
        totalAmount: 4000,
        influencerName: 'postothezippypuppy',
        paymentDetails: {
            name: 'Tiu Hazra',
            billingAddress: 'Purvi Mithila Apt',
            panNo: 'ACYPH 1101K',
            bankDetails: {
                accountHolderName: 'Tiu Hazra',
                accountNumber: '12431242134',
                bankName: 'ICICI Bank ltd',
                ifscCode: 'ICIC00002534'
            }
        },
        invoiceDate: '16.08.2023'
    },
    {
        id:'as123',
        brandName: 'JUST DOGS',
        brandAddress: 'JUST DOGS SPALONS PVT LTD, FIrst floor 1-A, satykaam society',
        brandGST: '24AADCJ2134J1ZU',
        description: 'Reel for DOGUST Sale',
        totalAmount: 5000,
        influencerName: 'postothezippypuppy',
        paymentDetails: {
            name: 'Tiu Hazra',
            billingAddress: 'Purvi Mithila Apt',
            panNo: 'ACYPH 1101K',
            bankDetails: {
                accountHolderName: 'Tiu Hazra',
                accountNUmber: '12431242134',
                bankName: 'ICICI Bank ltd',
                ifscCode: 'ICIC00002534'
            }
        },
        invoiceDate: '16.08.2023'
    },
    {
        id:'as124',
        brandName: 'JUST DOGS',
        brandAddress: 'JUST DOGS SPALONS PVT LTD, FIrst floor 1-A, satykaam society',
        brandGST: '24AADCJ2134J1ZU',
        description: 'Reel for DOGUST Sale',
        totalAmount: 7000,
        influencerName: 'postothezippypuppy',
        paymentDetails: {
            name: 'Tiu Hazra',
            billingAddress: 'Purvi Mithila Apt',
            panNo: 'ACYPH 1101K',
            bankDetails: {
                accountHolderName: 'Tiu Hazra',
                accountNUmber: '12431242134',
                bankName: 'ICICI Bank ltd',
                ifscCode: 'ICIC00002534'
            }
        },
        invoiceDate: '16.08.2023'
    }
]

const getAllInvoice = async (req, res, next) => {
    const invoices = await Invoice.find();
    if(!invoices) {
        return next(new HttpError('Could not find a place for given user id', 404));
    }
   
    res.json(invoices);
}

const createInvoice = async (req, res, next) => {

    const createdInvoice = new Invoice(req.body);
    console.log('received data', createdInvoice)
    try{
        await createdInvoice.save();
    } catch(err) {
        const error = new HttpError('Creating invoice failed', 500);
        return next(error);
    }

    res.status(201).json({invoice: createdInvoice});
}

const getInvoiceById = async (req, res, next) => {
    const invoiceId = req.params.invId;
    let invoice;
    try {
        //await Invoice.find({creator:invoiceId}); creator to find by antyhing apart from id
        invoice = await Invoice.findById(invoiceId); 
    } catch(err) {
        const error = new HttpError('Something went wrong, could not find a invoice', 500);
        return next(error);
    }

    if(!invoice) {
        const error = new HttpError('Could not find a invoice for the provided id', 404);
        return next(error);
    }

    res.status(201).json({data: invoice.toObject({getters: true})}); //getters true change _id to id
}

const updateInvoice = async (req,res,next) => {
    const invoiceId = req.params.invId;
    let invoice;
    try {
        //await Invoice.find({creator:invoiceId}); creator to find by antyhing apart from id
        invoice = await Invoice.findById(invoiceId); 
    } catch(err) {
        const error = new HttpError('Something went wrong, could not find a invoice', 500);
        return next(error);
    }
}

exports.getAllInvoice = getAllInvoice;
exports.createInvoice = createInvoice;
exports.getInvoiceById = getInvoiceById;
exports.updateInvoice = updateInvoice;