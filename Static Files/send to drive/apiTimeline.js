var userDb = require("./timelineSchema");

module.exports = {
  uploadPost: function(email, img, desc, cat, userName) {
    return new Promise((res, rej) => {
      userDb.create(
        {
          email: email,
          selectedFiles: img,
          description: desc,
          category: cat,
          userName: userName
        },
        function(err, doc) {
          if (err) rej(err);
          else res(doc);
        }
      );
    });
  },
  allUpload: function(userName) {
    console.log("userName......", userName);
    return new Promise((res, rej) => {
      userDb
        .find({}, function(err, doc) {
          if (err) rej(err);
          else res(doc);
        })
        .sort({ time: -1 });
    });
  },
  singleUpload: function(_id) {
    console.log("id", _id);
    return new Promise((res, rej) => {
      userDb.find(
        {
          _id: _id
        },
        function(err, doc) {
          if (err) rej(err);
          else res(doc);
        }
      );
    });
  },
  addComment: function(data) {
    console.log("add comment id", data.postId);
    var _id = data.postId;
    var comment = {
      comment: data.comment,
      commentedBy: data.commentedBy
    };
    console.log("comment", data.commentedBy, data.comment);
    return new Promise((res, rej) => {
      userDb.update(
        { _id: _id },
        {
          $push: {
            comment: { commentBy: data.commentedBy, comment: data.comment }
          }
        },
        function(err, result) {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  },

  addLike: function(data) {
    console.log("add like id", data.postId);
    var _id = data.postId;
    var like = {
      likedBy: data.likedBy
    };
    console.log("liked", data.likedBy);
    return new Promise((res, rej) => {
      userDb.update(
        { _id: _id },
        {
          $push: {
            like: { likedBy: data.likedBy }
          }
        },
        function(err, result) {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  },
  updatePost: (search, update) => {
    return new Promise((resolve, reject) => {
      userDb.update(search, update, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  disLike: function(data) {
    console.log("dislike post id in api ", data.postId);
    var _id = data.postId;
    var like = {
      likedBy: data.dislikeBy
    };
    console.log("disByliked", data.dislikeBy);
    return new Promise((res, rej) => {
      userDb.update(
        { _id: _id },
        {
          $pull: {
            like: { likedBy: data.dislikeBy }
          }
        },

        { multi: true },
        function(err, result) {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  },

  latestFirst: function() {
    console.log("latest first called");
    return new Promise((res, rej) => {
      userDb
        .find({}, function(err, doc) {
          if (err) rej(err);
          else res(doc);
        })
        .sort({ time: -1 });
    });
  },

  oldestFirst: function() {
    console.log("latest first called");
    return new Promise((res, rej) => {
      userDb
        .find({}, function(err, doc) {
          if (err) rej(err);
          else res(doc);
        })
        .sort({ time: 1 });
    });
  }
};
