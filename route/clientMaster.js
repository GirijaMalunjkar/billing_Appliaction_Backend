var express = require('express');
var clientMaster = express.Router();

const pool = require('../models/database');

clientMaster.get("/clientMaster", (req, res) => {
    var sql = "SELECT * FROM  client_master";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

clientMaster.get("/clientMaster/:id", (req, res) => {
    var clientMasterid = req.params.id;
    var sql = "SELECT FROM * client_master WHERE id=" + clientMasterid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

clientMaster.post('/clientMaster', (req, res) => {
        /*let map = {
        invoice_no: req.body.invoice_no,
        bill_date: req.body.bill_date,
        cname: req.body.cname,
        items: req.body.items,
        total: req.body.total, 
        discount: req.body.discount,
        recived: req.body.recived,
        balance: req.body.balance,
        note: req.body.note,
    }
    let sql =
    "UPDATE billing SET ? WHere id=" + req.params.id;

    let query = pool.query(sql, map, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Billing Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Billing Update Successfully"
            });
        }
    });*/
    
    let details = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        billing_address: req.body.billing_address,
        gst: req.body.gst,
        created_by: 0,
        status: 'active',

    };
    let sql = "INSERT INTO client_master SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "ClientMaster Created Fail" });
        } else {
            res.send({ status: true, message: "ClientMaster Created Successfully" });
        }
    })
});

clientMaster.put("/clientMaster/:id", (req, res) => {
    let sql =
        "UPDATE client_master SET name='" + req.body.name + 
        "', phone= '" +  req.body.phone +
        "', email= '" +  req.body.email +
        "', billing_address= '" +  req.body.billing_address +
        "', gst= '" +  req.body.gst +
        "' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "ClientMaster Update Failed"
            });
        } else {
            res.send({
                status: true, message: "ClientMaster Update Successfully"
            });
        }
    });
});


clientMaster.delete("/clientMaster/:id", (req, res) => {
    let sql =
        "UPDATE client_master SET name='" + req.body.name + 
        "', phone= '" +  req.body.phone +
        "', email= '" +  req.body.email +
        "', billing_address= '" +  req.body.billing_address +
        "', gst= '" +  req.body.gst +
        "', status= 'inactive' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            res.send({
                status: false, message: "ClientMaster Deleted Failed"
            });
        } else {
            res.send({
                status: true, message: "ClientMaster Deleted Successfully"
            });
        }
    });
});

clientMaster.get('/clientMaster/:id', (req, res) => {
    //let sql = 'SELECT si.id, i.item, s.id as salesid FROM items i JOIN sales_items si ON i.id = si.item_id JOIN sales s ON s.id = si.sale_id WHERE si.id = ?';

    let query = pool.query(sql, (err, res) => {
        console.log(err);
        if (err) {
            res.send({message:"error"});
        } else {
            res.send({ Message: "Joined Succussesfully" });
        }
    });
});

module.exports = clientMaster;