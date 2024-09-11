// config/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../../aurimax-42342-firebase-adminsdk-r93cv-b199609d67.json'); // Coloca la ruta correcta aquí

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin; // Exporta la instancia de admin para usarla en otros archivos
