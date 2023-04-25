var express = require('express');
var profile = express.Router();

const pool = require('../models/database');

profile.get("/profile", (req, res) => {
    var sql = "SELECT * FROM  profile";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

profile.get("/profile/:id", (req, res) => {
    var profileid = req.params.id;
    var sql = "SELECT FROM * profile WHERE id=" + profileid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

profile.post('/profile', (req, res) => {
    let details = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        gst_in_no: req.body.gst_in_no,
        logo: req.body.logo,
    };
    let sql = "INSERT INTO profile SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Profile Created Fail" });
        } else {
            res.send({ status: true, message: "Profile Created Successfully" });
        }
    })
});

profile.put("/profile/:id", (req, res) => {
    let sql =
    "UPDATE profile SET name='" + req.body.name + 
    "', address= '" +  req.body.address +
    "', phone= '" +  req.body.phone +
    "', email= '" +  req.body.email +
    "', website= '" +  req.body.website +
    "', gst_in_no= '" +  req.body.gst_in_no +
    "', logo= '" +  req.body.logo +
    "' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Profile Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Profile Update Successfully"
            });
        }
    });
});

profile.delete("/profile/:id", (req, res) => {
    let sql =
    "UPDATE profile SET name='" + req.body.name + 
    "', address= '" +  req.body.address +
    "', phone= '" +  req.body.phone +
    "', email= '" +  req.body.email +
    "', website= '" +  req.body.website +
    "', gst_in_no= '" +  req.body.gst_in_no +
    "', logo= '" +  req.body.logo +
    "', status= 'inactive' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Profile Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "Profile Delete Successfully"
            });
        }
    });
});

module.exports = profile;