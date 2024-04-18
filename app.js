const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoice-routes');
const mongoose = require('mongoose');

const username = 'collab';
const password = 'collabconnection2016';
const db = 'invoices';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
    next();
});

app.use('/api/invoice', invoiceRoutes);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'This part of site not working at this moment, please try again!'});
});

mongoose.connect(`mongodb+srv://${username}:${password}@collab-cluster.yjbgmfd.mongodb.net/${db}?retryWrites=true&w=majority`).then( () => {
    app.listen(process.env.HTTP_PORT || 5000);
}).catch( err => {
    console.error(err)
})
