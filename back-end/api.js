var userDb = require("./schemas");
module.exports = {
  signUp: function(data) {
    console.log("nnnnnnnnnnnnnnnnn", data);
    return new Promise((res, rej) => {
      userDb.create(data, function(err, doc) {
        if (err) rej(err);
        else res(doc);
      });
    });
  },
  verifyonSignup: function(email, verifyStatus) {
    console.log("signup verify", email);
    return new Promise((res, rej) => {
      userDb.update(
        { email: email },
        { $set: { verifyStatus: true } },
        function(err, result) {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  },

  login: function(getEmail) {
    console.log("signIn request:", getEmail);
    return new Promise((res, rej) => {
      userDb.find({ email: getEmail }, function(err, result) {
        if (err) rej(err);
        else res(result);
      });
    });
  },
  loginPass: function(getEmail, getPass) {
    console.log("signIn request:", getEmail, getPass);
    return new Promise((res, rej) => {
      userDb.find({ email: getEmail, password: getPass }, function(
        err,
        result
      ) {
        if (err) rej(err);
        else res(result);
      });
    });
  },
  forgetPass: function(getEmail) {
    console.log("forget request:", getEmail);
    return new Promise((res, rej) => {
      userDb.find({ email: getEmail }, function(err, result) {
        if (err) rej(err);
        else res(result);
      });
    });
  },

  resetPass: function(_id, getPass) {
    console.log("reset request:", getPass, _id);
    return new Promise((res, rej) => {
      userDb.update({ _id: _id }, { $set: { password: getPass } }, function(
        err,
        result
      ) {
        if (err) rej(err);
        else res(result);
      });
    });
  }
};
