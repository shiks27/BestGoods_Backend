var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")
router.post('/finalproductsubmit', upload.single('picture'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("insert into finalproduct(categoryid,subcategoryid,companyid,productid,colorid,modelid,description,price,stock,offerprize,picture,size,productstatus) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid ,req.body.modelid,req.body.colorid,req.body.description,req.body.price,req.body.stock,req.body.offerprize,req.file.originalname,req.body.size,req.body.productstatus] , function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ result: false });
            }
            else {
                console.log("Result",result.insertId)
                res.status(200).json({ result: true,finalproductid:result.insertId });
            }
        })
    }
    catch (e) {ō
        console.log("Error", e);
        res.status(500).json({ result: false })
    }
})


router.get('/displayfinalproducts',function(req,res){
    console.log(req.body)
    try{
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid)as companyname,(select productname from products P where P.productid=F.productid)as productname,(select modelname from models M where M.modelid=F.modelid)as modelname,(select color from colors Col where Col.colorid=F.colorid)as color from finalproduct F",function(error,result){
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


router.get('/displayfinalproducttrending',function(req,res){
    console.log(req.body)
    try{
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid)as companyname,(select productname from products P where P.productid=F.productid)as productname,(select modelname from models M where M.modelid=F.modelid)as modelname,(select color from colors Col where Col.colorid=F.colorid)as color from finalproduct F where F.productstatus='Trending'",function(error,result){
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



router.post('/displayfinalproductbysubcategoryid',function(req,res){
    console.log(req.body)
    try{
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid)as companyname,(select productname from products P where P.productid=F.productid)as productname,(select modelname from models M where M.modelid=F.modelid)as modelname,(select color from colors Col where Col.colorid=F.colorid)as color from finalproduct F where F.subcategoryid=?",[req.body.subcategoryid],function(error,result){
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

router.post('/displayfinalproductbyprice',function(req,res){
    console.log(req.body)
    try{
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid)as companyname,(select productname from products P where P.productid=F.productid)as productname,(select modelname from models M where M.modelid=F.modelid)as modelname,(select color from colors Col where Col.colorid=F.colorid)as color from finalproduct F where F.subcategoryid=? and F.price between ? and ?",[req.body.subcategoryid,req.body.min,req.body.max],function(error,result){
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
router.post('/displayproductbyfinalproductid',function(req,res){
    console.log(req.body)
    try{
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid)as companyname,(select productname from products P where P.productid=F.productid)as productname,(select modelname from models M where M.modelid=F.modelid)as modelname,(select color from colors Col where Col.colorid=F.colorid)as color from finalproduct F where F.finalproductid=?",[req.body.finalproductid],function(error,result){
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
router.post('/updatefinalproductdata', function (req, res) {
    console.log(req.body)
    try {
        pool.query("update finalproduct set categoryid=?,subcategoryid=?,companyid=?,productid=?,colorid=?,modelid=?,description=?,price=?,stock=?,offerprize=?,size=?  where finalproductid=?", [req.body.categoryId,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.colorid,req.body.modelid,req.body.description,req.body.price,req.body.stock,req.body.offerprize,req.body.finalproductid,req.body.size], function (error, result) {
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
        pool.query("update finalproduct set picture=? where finalproductid=?", [ req.file.originalname,req.body.finalproductid], function (error, result) {
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


router.post('/deletefinalproduct', function (req, res) {
    console.log(req.body)
    try {
        pool.query("delete  from finalproduct  where finalproductid=?", [req.body.finalproductid], function (error, result) {
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
router.post('/savemorepictures',upload.any(),function(req,res){
    
    console.log(req.body)
    console.log(req.files)
    var q="insert into morepictures(finalproductid,image)values ?"
    pool.query(q,[req.files.map((item)=> [req.body.finalproductid,item.filename] )],function(error,result){
        if (error) {
            console.log(error)
            res.status(500).json({ result: false }); 
        }
        else {
            console.log("Result",result.insertId)
            res.status(200).json({ result: true});
        }
    })

})

router.get('/displaymorepictures',function(req,res){
    console.log(req.body)
    try{
        pool.query("select * from morepictures",function(error,result){
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


router.post('/editmorepicture', upload.single('picture'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("update morepictures set image=? where pictureid=?", [ req.file.originalname,req.body.pictureid], function (error, result) {
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

router.post('/deletemorepictures', function (req, res) {
    console.log(req.body)
    try {
        pool.query("delete  from morepictures  where pictureid=?", [req.body.pictureid], function (error, result) {
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
