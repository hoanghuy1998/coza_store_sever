module.exports=login=>{
    const loginUser=require('../controllers/login.controller')
    login.post('/login',loginUser.login)
}