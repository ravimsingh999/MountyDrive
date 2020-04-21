const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
router.get('/', (req, res) => {
    res.render("Customer/addOrEdit", {
        viewTitle: "Insert Customer"
    });
});
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});
function insertRecord(req, res) {
    var Customer = new Customer();
    Customer.c_name = req.body.c_name;
    Customer.f_name = req.body.f_name;
    Customer.c_email = req.body.c_email;
    Customer.c_mobnum = req.body.c_mobnum;
    Customer.c_address = req.body.c_address;
    Customer.save((err, doc) => {
        if (!err)
            res.redirect('Customer/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("Customer/addOrEdit", {
                    viewTitle: "Insert Customer",
                    Customer: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('Customer/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("Customer/addOrEdit", {
                    viewTitle: 'Update Customer',
                    Customer: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Customer.find((err, docs) => {
        if (!err) {
            res.render("Customer/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Customer list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'c_name':
                body['c_nameError'] = err.errors[field].message;
                break;
            case 'c_email':
                body['c_emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("Customer/addOrEdit", {
                viewTitle: "Update Customer",
                Customer: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/Customer/list');
        }
        else { console.log('Error in Customer delete :' + err); }
    });
});

module.exports = router;