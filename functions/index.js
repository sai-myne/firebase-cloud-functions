const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignup = functions
  .region("asia-southeast2")
  .auth.user()
  .onCreate((user) => {
      // for background triggers you must return a value/promise
      return admin.firestore().collection('users').doc(user.uid).set({
          email: user.email,
          upvoteOn: []
      });
  });

// auth trigger( user deleted)
exports.userDeleted = functions
  .region("asia-southeast2")
  .auth.user()
  .onDelete((user) => {
      // for background triggers you must return a value/promise
      const doc = admin.firestore().collection('users').doc(user.uid);
      return doc.delete();
  });
