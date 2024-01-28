var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")
router.post('/companysubmit', upload.single('logo'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("insert into company(companyname,contactperson,companycontactno,companyemailid,address1,address2,country,description,state,city,zipcode,logo)values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname,req.body.personname,req.body.phonenumber,req.body.emailid,req.body.address1,req.body.address2,req.body.country,req.body.description,
            req.body.state,req.body.city,req.body.zipcode,req.file.originalname] , function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        })
    }
    catch (e) {
        console.log("Error", e);
        res.status(500).json({ result: false })
    }
})
router.get('/displayallcompanies', function (req, res) {
    try {
        pool.query("select * from company", function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).json({ data: [] })
            }
            else {
                console.log(result);
                res.status(200).json({ data: result })
            }
        })
    }
    catch (e) {
        console.log("Error", e);
        res.status(500).json({ result: [] })
    }
})

router.post('/updatecompanydata', function (req, res) {
    console.log(req.body)
    try {
        pool.query("update company set companyname=?,contactperson=?,companycontactno=?,companyemailid=?,address1=?,address2=?,country=?,description=?,state=?,city=?,zipcode=?  where companyid=?", [req.body.companyname,req.body.personname,req.body.phonenumber,req.body.emailid,req.body.address1,req.body.address2,req.body.country,req.body.description,
            req.body.state,req.body.city,req.body.zipcode,req.body.companyid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).json({ result: false })
            }
            else {
                console.log(result);
                res.status(200).json({ result: true })
            }
        })
    }
    catch (e) {
        console.log("Error", e);
        res.status(500).json({ result: false })
    }
})

router.post('/editcompanylogo', upload.single('logo'), function (req, res) {
    try {
       
        pool.query("update company set logo=? where companyid=?", [ req.file.originalname,req.body.companyid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        })
    }
    catch (e) {
        console.log("Error", e);
        res.status(500).json({ result: false })
    }
})
module.exports=router;