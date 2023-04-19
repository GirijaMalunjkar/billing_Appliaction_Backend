var express = require('express');
var employee = express.Router();

const pool = require('../models/database');

employee.get("/employee", (req, res) => {
    var sql = "SELECT * FROM  employee";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

employee.get("/employee/:id", (req, res) => {
    var employeeid = req.params.id;
    var sql = "SELECT FROM * employee WHERE id=" + employeeid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

employee.post('/employee', (req, res) => {
    let details = {
       employee_name: req.body.employee_name
    };
    let sql = "INSERT INTO employee SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Employee Created Fail" });
        } else {
            res.send({ status: true, message: "Employee Created Successfully" });
        }
    })
});

employee.put("/employee/:id", (req, res) => {
    let sql =
    "UPDATE employee SET employee_name='" + req.body.employee_name +
    "' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Employee Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Employee Update Successfully"
            });
        }
    });
});

employee.delete("/employee/:id", (req, res) => {
    let sql =
    "UPDATE employee SET name='" + req.body.name + 
    "', address= '" +  req.body.address +
    "', phone= '" +  req.body.phone +
    "', email= '" +  req.body.email +
    "', website= '" +  req.body.website +
    "', gst= '" +  req.body.gst +
    "', logo= '" +  req.body.logo +
    "', status= 'inactive' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Employee Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "Employee Delete Successfully"
            });
        }
    });
});

employee.get('/employee/:id', (req, res) => {
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

module.exports = employee;