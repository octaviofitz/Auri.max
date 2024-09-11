// pages/api/register.js
import admin from '../config/firebaseAdmin'; // Importas tu configuración de Firebase Admin

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });
      res.status(200).json({ uid: userRecord.uid });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user: ' + error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
