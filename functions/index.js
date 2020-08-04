const functions = require('firebase-functions');

// http request 1
exports.randomNumber = functions.region('asia-southeast2').https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    console.log(number);
    response.send(number.toString());
});

// http request 2
exports.toTheDojo = functions.region('asia-southeast2').https.onRequest((request, response) => {    
    response.redirect('https://www.thenetninja.co.uk');
});

// http callabel function
exports.sayHello = functions.region('asia-southeast2').https.onCall((data, context) => {
    const name = data.name;
    return `hello, ${name}`;
});