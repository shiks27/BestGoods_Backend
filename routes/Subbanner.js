var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")
router.post('/savesubbanner',upload.any(),function(req,res){
    
    console.log(req.body)
    console.log(req.files)
    var q="insert into subbanner(categoryid,subcategoryid,image)values ?"
    pool.query(q,[req.files.map((item)=> [req.body.categoryid,req.body.subcategoryid,item.filename] )],function(error,result){
        if (error) {
            console.log(error)
            res.status(500).json({ result: false }); 
        }
        else {
            console.log("Result",result.insertId)
            res.status(200).json({ result: true,subbannerid:result.insertId });
        }
    })

})

router.post('/displayallbannerbyid', function (req, res) {
    try {
        pool.query("select * from subbanner where subcategoryid=?",[req.body.subcategoryid], function (error, result) {
            if (error) {
                // console.log(error);
                res.status(500).json({ data: [] })
            }
            else {
                // console.log(result);
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
