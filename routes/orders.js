var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")
router.post('/saveorders', function (req, res, next) {

    console.log(req.body)
    var q = "insert into orders (orderdate,finalproductid,productname,price,offerprice,qty,amount,emailid,mobileno,address,city,state,zipcode,paymentmode,paymenttype,transactionid,deliverystatus,status) values ?";
    pool.query(
        q, [req.body.cart.map((item) => [req.body.date, item.finalproductid, item.productname, item.price, item.offerprize, item.qty,
        req.body.amount, req.body.emailid, req.body.mobileno, req.body.address, req.body.city, req.body.state, req.body.zipcode, req.body.paymentmode, req.body.paymenttype, req.body.transactionid, req.body.deliverystatus, req.body.status])],
        function (error, result) {
            if (error) {
                console.log(">>>>>", error);
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        }
    )
}

);
module.exports = router;