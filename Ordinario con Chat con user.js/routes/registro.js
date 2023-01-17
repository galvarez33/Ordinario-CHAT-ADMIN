var express = require('express');
var router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('registro.ejs', { title: 'Armazón', logged_user: req.session.user });
});

router.post("/", function (req, res, next) {

  console.log(req.session.user);
  const user = req.body.user;
  const pass = req.body.pass; //agarrar name de input
  const pass1 = req.body.pass1;
  const roles = req.body.roles;

  if (!users[user]) {
    req.session.user = users[user];
    if (pass != pass1) {
      req.session.error = "Passwords don't match";
      res.redirect("/registro");
    } else if (pass.length  > 4 && pass1.length > 4) {
      req.session.error = "4 carcateres como mucho xd";
      res.redirect("/registro");
    } else if (pass === pass1) {

      if ( roles == "usuario") {
        users.register(user, pass, "user", function () {
          console.log("Se ha registrado con exito el usuario");
          req.session.message = "You have just registered please enter new account to log in!";
          res.redirect("/login");
        });
      } else {
        users.register(user, pass, "admin", function () {
          console.log("Se ha registrado con exito el admin");
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