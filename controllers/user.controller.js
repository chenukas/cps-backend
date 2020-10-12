const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");

const User = mongoose.model("User");

module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.userType = req.body.userType;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(["Email address is already in use."]);
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
	console.log("Hi");
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    else
      return res
        .status(200)
        .json({
          status: true,
          user: _.pick(user, ["fullName", "email", "userType"]),
        });
  });
};

module.exports.userProfileByEmail = (req, res) => {

  console.log("Hi");

  if(!req.body.email) {
    return res.status(400).json({
      success: false,
      message: "Email is undefined"
    });
  }

  let email = req.body.email;
  email = email.toLowerCase();

  User.find({
    email: email
    },(err, users) => {
    if (err){
        console.log('err 2:', err);
        return res.send({
            success: false,
            message: 'Error: Server error'
        });
    }
    if (users.length !== 1){
        return res.send({
            success: false,
            message: 'Invalid User Email'
        });
    }

    const user = users[0];

    User.findById(user._id).then(result => {
      res.status(200).json({
          success: true,
          data: result,
          message: "Searching ID is found."
      });
    })
});
};
