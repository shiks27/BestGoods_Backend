var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require("./multer")
router.post('/subcategorysubmit',upload.single('image'),function(req,res){
    try{
        console.log(req.body)
        console.log(req.file)
        pool.query("insert into subcategories(categoryid,subcategoryname,subcategorydesc,image)values(?,?,?,?)",[req.body.categoryId,req.body.subcategoryname,req.body.description,req.file.originalname],function(error,result){
            if(error){
                console.log(error)
                res.status(500).json({result:false});
            }
            else{
                res.status(200).json({result:true});
            }
        })
    }
    catch(e){
        console.log("Error",e);
        res.status(500).json({result:false})
    }
})

router.get('/displayallsubcategory',function(req,res){
    try{
        pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname  from subcategories S",function(error,result){
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
    catch(e){8
        console.log("Error",e);
        res.status(500).json({result:[]})
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





//select * from subcategories where categoryid=?,[req.body.categoryid]
router.post('/updatesubcategorydata', function (req, res) {
    console.log(req.body)
    try {
        pool.query("update subcategories set categoryid=?,subcategoryname=?,subcategorydesc=? where subcategoryid=?", [req.body.CategoryId,req.body.SubCategoryname,req.body.SubCategoryDescription, req.body.subCategoryId], function (error, result) {
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



router.post('/subcategoryeditpicture', upload.single('image'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("update subcategories set image=? where subcategoryid=?", [ req.file.originalname,req.body.subCategoryId], function (error, result) {
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

router.post('/deletesubcategory', function (req, res) {
    console.log(req.body)
    try {
        pool.query("delete  from subcategories  where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
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