const {expressjwt:jwt}=require("express-jwt")
const config=require("../../nodemon.json")

function jwtconfig(){
    const {secret}=config;
    return jwt({secret,algorithms:["RS256","HS256"],}).unless({
        path:[
            "/users/checkuserbymobilenumber",
            "/category/displayallcategory"
        ]
    })
}
module.exports=jwtconfig;