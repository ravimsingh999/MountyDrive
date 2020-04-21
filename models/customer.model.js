const mongoose = require('mongoose');

var Customer_schema = new mongoose.Schema({
    checkin: {
        type: Date,
        required: 'This field is required.'
    },
    Checkout: {
        type: Date,
        required: 'This field is required.'
    },
    c_name: {
        type: String,
        required: 'This field is required.'
    },
    c_fatherName: {
        type: String,
        required: 'This field is required.'
    },
    c_email: {
        type: String
    },
    c_aadhar: {
        type: String,
        required: 'This field is required.'
    },
    c_mobile: {
        type: String
    },
    c_address: {
        type: String
    }
});



mongoose.model('Hotel', Customer_schema);
