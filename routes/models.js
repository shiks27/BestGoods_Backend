var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")

router.post('/submitmodel', upload.single('picture'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("insert into models(categoryid,subcategoryid,companyid,productid,modelname,size,weight,picture) values(?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid ,req.body.modelname,req.body.size,req.body.weight,req.file.originalname] , function (error, result) {
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


router.get('/displayallmodels',function(req,res){
    console.log(req.body)
    try{
        pool.query("select M.*,(select categoryname from categories C where C.categoryid=M.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=M.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=M.companyid)as companyname,(select productname from products P where P.productid=M.productid)as productname from models M",function(error,result){
            if(error){
                console.log(error);
                res.status(500).json({data:[]})
            }
            else{
                console.log(result);
                res.status(200).json({data:result})
            }
        })
    }
    catch(e){
        console.log("Error",e);
        res.status(500).json({result:[]})
    }
})



router.post('/displayallmodelsbycompany',function(req,res){
    console.log(req.body)
    try{
        pool.query("select M.*,(select categoryname from categories C where C.categoryid=M.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=M.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=M.companyid)as companyname,(select productname from products P where P.productid=M.productid)as productname from models M where M.companyid=?",[req.body.companyid],function(error,result){
            if(error){
                console.log(error);
                res.status(500).json({data:[]})
            }
            else{
                console.log(result);
                res.status(200).json({data:result})
            }
        })
    }
    catch(e){
        console.log("Error",e);
        res.status(500).json({result:[]})
    }
})

router.post('/updatemodeldata', function (req, res) {
    console.log(req.body)
    try {
        pool.query("update models set categoryid=?,subcategoryid=?,companyid=?,productid=?,modelname=?,size=?,weight=? where modelid=?", [req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.modelname,req.body.size,req.body.weight,req.body.modelid], function (error, result) {
            if (error) {
               
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

router.post('/editpicture', upload.single('picture'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("update models set picture=? where modelid=?", [ req.file.originalname,req.body.modelid], function (error, result) {
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
router.post('/deletemodels', function (req, res) {
    console.log(req.body)
    try {
        pool.query("delete  from models  where modelid=?", [req.body.modelid], function (error, result) {
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
module.exports=router;