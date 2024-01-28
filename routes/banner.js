var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")
router.post('/bannersubmit', upload.single('image'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("insert into banner(description,image,priority) values(?,?,?)",[req.body.description,req.file.originalname,req.body.priority] ,function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true});
            }
        })
    }
    catch (e) {
        console.log("Error", e);
        res.status(500).json({ result: false })
    }
})

router.get('/displayallbanners', function (req, res) {
    try {
        pool.query("select * from banner", function (error, result) {
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
router.post('/updatebanner', function (req, res) {
    console.log(req.body)
    try {
        pool.query("update banner set description=?,priority=? where bannerid=?", [req.body.description,req.body.priority,req.body.bannerid], function (error, result) {
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
router.post('/editbanner', upload.single('image'), function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        pool.query("update banner set image=? where bannerid=?", [req.file.originalname,req.body.bannerid], function (error, result) {
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


router.post('/deletebanner', function (req, res) {
    console.log(req.body)
    try {
        pool.query("delete  from banner  where bannerid=?", [req.body.bannerid], function (error, result) {
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