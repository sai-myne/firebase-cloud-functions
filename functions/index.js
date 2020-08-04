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

// http callable function (adding a request)
exports.addRequest = functions
  .region('asia-southeast2')
  .https.onCall((data, context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'only authenticated users can add requests'
        );
    }
    if(data.text.length > 30){
        throw new functions.https.HttpsError(
            'invalid-argument',
            'request must be no more than 30 characters long'
        );
    }
    return admin.firestore().collection('requests').add({
        text: data.text,
        upvotes: 0,
    });
  });
