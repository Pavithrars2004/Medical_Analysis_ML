const admin = require("firebase-admin");

const serviceAccount = require("./mediai-9100d-firebase-adminsdk-fbsvc-e96ababef4.json"); // Update with the actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
