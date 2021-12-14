const db = require("../common/connectAllProductMysql");
const User = (User) => {
    (this.id = User.id),
      (this.userName = User.userName),
      (this.avata = User.avata),
      (this.status = User.status),
      (this.gender = this.gender),
      (this.email = User.email),
      (this.dress = User.dress),
      (this.create_at = User.create_at),
      (this.update_at = User.update_at),
      (this.age = User.age),
      (this.date=User.date),
      (this.password=User.password)
  };
User.postUser = (data, result) => {
    db.query("SELECT * FROM user", data, (err, user) => {
      if (err) {
        console.log("err", err);
        result(null);
      }else {
        const x=user.filter(u=>u.email===data.email)
        if(x&&x.length>0){
            if(x[0].password===parseInt(data.password)){
                result({
                    errorCode:0,
                    data:x[0]
                })
            }else {
                result({
                    errorCode:2,
                    errorMessage:'Email or Password wrong'
                })
            }
        }else{
            result({
                errorCode:1,
                errorMessage:'Invalid Email'
            });
        }
      }
    });
  };
  module.exports = User