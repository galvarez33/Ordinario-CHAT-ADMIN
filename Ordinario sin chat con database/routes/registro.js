var express = require('express');
const database = require('../database');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('registro.ejs', { title: 'Armazón', logged_user: req.session.user });
});

router.post("/", function (req, res, next) {

 
  const user = req.body.user;
  const pass = req.body.pass; //agarrar name de input
  const pass1 = req.body.pass1;
  const roles = req.body.roles;





  if (!database.users[user]) {
    req.session.users = database.users[user];
    if (pass != pass1) {
      req.session.error = "Passwords don't match";
      res.redirect("/registro");
    } else if (pass.length < 4 && pass1.length < 4) {
      req.session.error = "Passwords need to be 8 characters long";
      res.redirect("/registro");
    } else if (pass === pass1) {
     
      if (roles == "usuario") {
        database.users.register(user, pass, "user", function () {
          console.log("rol:"+roles);
          console.log("Se ha registrado con exito");
          req.session.message = "You have just registered please enter new account to log in!";
           
          res.redirect("/login");
        });
      } else {
        
        database.users.register(user, pass, "admin", function () {
          console.log("Se ha registrado con exito");
          req.session.message = "You have just registered please enter new account to log in!";
          res.redirect("/login");
        });

      }

    }
  } else {
    req.session.error = "User already exists";
    res.redirect("/registro");
  }

});

module.exports = router;