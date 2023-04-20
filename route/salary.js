var express = require('express');
var salary = express.Router();

const pool = require('../models/database');

salary.get("/salary", (req, res) => {
    var sql = "SELECT * FROM  salary";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salary.get("/salary/:id", (req, res) => {
    var salaryid = req.params.id;
    var sql = "SELECT FROM * salary WHERE id=" + salaryid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salary.post('/salary',(req, res) => {
    let details = {
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        salary_date: req.body.salary_date,
        salary_ammount: req.body.salary_ammount,
        salary_mode: req.body.salary_mode,
        created_by: 1,
        status: 'active',
    };
    let sql = "INSERT INTO salary SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Salary Created Fail" });
        } else {
            res.send({ status: true, message: "Salary Created Successfully" });
        }
    });
});

salary.put("/salary/:id", (req, res) => {
    let sql =
        "UPDATE salary SET employee_name='" + req.body.employee_name +
        "', employee_date='" + req.body.employee_date +
        "', salary_ammount='" + req.body.salary_ammount +
        "', salary_mode='" + req.body.salary_mode +
        "' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Salary Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Salary Update Successfully"
            });
        }
    });
});

salary.delete("/salary/:id", (req, res) => {
    let sql =
        "UPDATE salary SET employee_name='" + req.body.employee_name +
        "', employee_date='" + req.body.employee_date +
        "', salary_ammount='" + req.body.salary_ammount +
        "', salary_mode='" + req.body.salary_mode +
        "', status= 'inactive' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Salary Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "Salary Delete Successfully"
            });
        }
    });
});

salary.get('/getsalary/:id', (req, res) => {
    let sql = 'SELECT e.* FROM employee AS e, salary AS s WHERE e.id = s.id';

    let query = pool.query(sql, (err, res) => {
        console.log(err);
        if (err) {
            res.send({ message: "error" });
        } else {
            res.send({ Message: "Joined Succussesfully" });
        }
    });
});

module.exports = salary;