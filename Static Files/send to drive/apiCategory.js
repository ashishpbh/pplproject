var userDb = require("./categorySchema");
module.exports = {
  addCategory: function(img, category) {
    return new Promise((res, rej) => {
      userDb.create(
        {
          categoryImg: img,
          categoryName: category
        },
        function(err, doc) {
          if (err) rej(err);
          else res(doc);
        }
      );
    });
  },
  showCategory: function() {
    console.log("show category");
    return new Promise((res, rej) => {
      userDb.find({}, function(err, doc) {
        if (err) rej(err);
        else res(doc);
      });
    });
  }
};
