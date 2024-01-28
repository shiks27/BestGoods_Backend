var express = require('express');
var router = express.Router();
const config=require("../nodemon.json")
const jwt=require("jsonwebtoken")
var pool=require("./pool");
/* GET users listing. */
router.post('/checkuserbymobilenumber', function(req, res, next) {
  pool.query("select * from users where mobileno=?",[req.body.mobileno],function(error,result){
    if(error){
      res.status(500).json({result:false})
    }
    else{
      if(result.length>0){
        const token=jwt.sign({sub:result},config.secret,{
          expiresIn:"1h"
        })

        return res.status(200).json({
          result:true,
          data:result[0],
          token:token
        })
      }
      else{
        res.status(500).json({result:false,data:[]})
      }
    }
  })
});

router.post('/fetchuserdata',function(req,res,next){
  pool.query("select * from users where mobileno=?",[req.body.mobileno],function(error,result){
    if(error){
      console.log(error)
      res.status(500).json({result:false})
    }
    else{
      if(result.length>0){
        res.status(200).json({result:true,data:result[0]})
      }
      else{
        res.status(500).json({result:false,data:[]})
      }N
    }
  })
});
router.post('/checkuserlogin', function(req, res, next) {
  pool.query("select * from users where (mobileno=? or emailid=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
    if(error){
      console.log(error)
      res.status(500).json({result:false})
    }
    else{
      if(result.length>0){
        res.status(200).json({result:true,data:result[0]})
      }
      else{
        res.status(500).json({result:false,data:[]})
      }
    }
  })
});
router.post('/checkuseraddress', function(req, res, next) {
  pool.query("select * from usersaddress where usermobileno=?",[req.body.mobileno],function(error,result){
    if(error){
      res.status(500).json({result:false})
    }
    else{
      if(result.length>0){
        res.status(200).json({result:true,data:result})
      }
      else{
        res.status(500).json({result:false,data:[]})
      }
    }
  })
});

router.post('/insertuser', function(req, res, next) {
  pool.query("insert into users values(?,?,?,?,?)",[req.body.mobileno,req.body.emailid,req.body.firstname,req.body.lastname,req.body.password],function(error,result){
    if(error){
      res.status(500).json({result:false});
    }
    else{
      res.status(200).json({result:true});
    }
  })

});
router.post('/addnewaddress', function(req, res, next) {
  pool.query("insert into usersaddress (mobileno,addressone,addresstwo,state,city,zipcode,firstname,lastname,usermobileno) values(?,?,?,?,?,?,?,?,?)",[req.body.mobileno,req.body.addressone,req.body.addresstwo,req.body.states,req.body.city,req.body.zipcode,req.body.firstname,req.body.lastname,req.body.usermobileno],function(error,result){
    if(error){
      res.status(500).json({result:false});
    }
    else{
      res.status(200).json({result:true});
    }
  })

});
router.get('/displayaddress', function(req, res, next) {
  pool.query("select * from usersaddress ",function(error,result){
    if(error){
      res.status(500).json({result:false});
    }
    else{
      res.status(200).json({result:result});
    }
  })

});
// router.post('/showuserdatabymobile',function(req,res,next){
//   pool.query("select * from useraddress where mobileno=?",function(error,result){
//     if(error){
//       res.status(500).json({result:false});
//     }
//     else{
//       res.status(200).json({result:true})
//     }
//   })
// })
module.exports = router;
