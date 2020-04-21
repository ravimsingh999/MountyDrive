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

// Custom validation for email
Customer_schema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Hotel', Customer_schema);