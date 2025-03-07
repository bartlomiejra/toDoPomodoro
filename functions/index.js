const functions = require('firebase-functions');
const cors = require('cors')({ origin: true }); // Dodaj obsługę CORS

exports.getApiKey = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const apiKey = functions.config().settings.apikey; // Pobierz klucz API z konfiguracji Firebase
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not found in config.' });
    }
    res.status(200).json({ apiKey });
  });
});
