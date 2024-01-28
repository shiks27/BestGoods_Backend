var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")
router.post('/colorsubmit', upload.single('picture'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("insert into colors(categoryid,subcategoryid,companyid,productid,color,picture) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid ,req.body.color,req.file.originalname] , function (error, result) {
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
router.get('/displayallcolors',function(req,res){
    console.log(req.body)
    try{
        pool.query("select Col.*,(select categoryname from categories C where C.categoryid=Col.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=Col.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=Col.companyid)as companyname,(select productname from products P where P.productid=Col.productid)as productname from colors Col",function(error,result){
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

router.post('/displayallcolorsbycompany',function(req,res){
    console.log(req.body)
    try{
        pool.query("select Col.*,(select categoryname from categories C where C.categoryid=Col.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=Col.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=Col.companyid)as companyname,(select productname from products P where P.productid=Col.productid)as productname from colors Col where Col.companyid=?",[req.body.companyid],function(error,result){
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
router.post('/updatecolordata', function (req, res) {
    console.log(req.body)
    try {
        pool.query("update colors set categoryid=?,subcategoryid=?,companyid=?,productid=?,color=? where colorid=?", [req.body.categoryId,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.color,req.body.colorid], function (error, result) {
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
        pool.query("update colors set picture=? where colorid=?", [ req.file.originalname,req.body.colorid], function (error, result) {
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

router.post('/deletecolors', function (req, res) {
    console.log(req.body)
    try {
        pool.query("delete  from colors  where colorid=?", [req.body.colorid], function (error, result) {
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
router.post('/displayallsubcategorybycategory',function(req,res){
    console.log(req.body);
    try{
        pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname  from subcategories S where S.categoryid=?",[req.body.categoryid],function(error,result){
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


router.get('/displayallproductsbysubcategory', function (req, res) {
    try {
        pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=P.companyid)as companyname from products P where P.subcategoryid=?",[req.body.subCategoryId], function (error, result) {
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

module.exports=router;