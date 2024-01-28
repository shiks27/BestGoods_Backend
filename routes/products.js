var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");
router.post('/productsubmit',upload.single('icon'),function(req,res){
    try{
      console.log(req.body)
      console.log(req.file)
     pool.query("insert into products(categoryid,subcategoryid,companyid,productname,description,status,logo) values(?,?,?,?,?,?,?)",[req.body.categoryId,req.body.subCategoryId,req.body.companyId,req.body.productName,req.body.description,req.body.selectedValue,req.file.originalname],function(error,result){
         if(error)
         {
           console.log(error)
           res.status(500).json({result:false})
         }
         else
         {
           res.status(200).json({result:true})
         }
     })
    }
    catch(e)
    {
        console.log("Error:",e)
        res.status(500).json({result:false})
    }
   })

   router.get('/displayallproducts', function (req, res) {
    try {
        pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=P.companyid)as companyname from products P ", function (error, result) {
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

router.post('/displayallproductsbysubcategory', function (req, res) {
    console.log(req.body);
    try {
        pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=P.companyid)as companyname from products P where P.subcategoryid=?",[req.body.subcategoryid], function (error, result) {
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

router.post('/displayallproductsbycompany', function (req, res) {
    console.log(req.body);
    try {
        pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select companyname from company Co where Co.companyid=P.companyid)as companyname from products P where P.productid=?",[req.body.productid], function (error, result) {
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

router.post('/updateproductdata', function (req, res) {
    console.log(req.body)
    try {
        pool.query("update products  set categoryid,subcategoryid,companyid,productname,description,status,icon ", [req.body.categoryId,req.body.subCategoryId,req.body.companyId,req.body.productName,
        req.body.description,req,body.status,req.file.originalname], function (error, result) {
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

router.post('/editproductlogo', upload.single('logo'), function (req, res) {
    try {
       
        pool.query("update products set logo=? where productid=?", [ req.file.originalname,req.body.productid], function (error, result) {
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
router.post('/deleteproducts', function (req, res) {
    console.log(req.body)
    try {
        pool.query("delete  from products  where productid=?", [req.body.productid], function (error, result) {
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