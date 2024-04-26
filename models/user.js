const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String, required: false },
    email: { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    image: { type: String, required: false },
    facebookProvider: {
        fbId: { type: String, required: true, unique: true },
        token: { type: String, required: false }
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);