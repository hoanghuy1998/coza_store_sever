const User=require('../modules/login.modules')
exports.login=(req,res)=>{
    User.postUser(req.body,reqnse=>res.send(reqnse))
}