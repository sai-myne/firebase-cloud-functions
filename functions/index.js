const functions = require("firebase-functions");

// auth trigger (new user signup)
exports.newUserSignup = functions
  .region("asia-southeast2")
  .auth.user()
  .onCreate((user) => {
      console.log('user created', user.email, user.uid);
  });

// auth trigger( user deleted)
exports.userDeleted = functions
  .region("asia-southeast2")
  .auth.user()
  .onDelete((user) => {
      console.log('user deleted', user.email, user.uid);
  });
