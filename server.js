const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Lire le fichier data.json
function readData() {
    return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
}

// Sauvegarder les données dans data.json
function writeData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
}

// Endpoint pour récupérer les réservations
app.get('/api/getReservations', (req, res) => {
    const data = readData();
    res.json(data.reservations || []);
});

// Endpoint pour sauvegarder une réservation
app.post('/api/saveReservation', (req, res) => {
    const reservation = req.body;
    const data = readData();

    if (!data.reservations) {
        data.reservations = [];
    }

    data.reservations.push(reservation);
    writeData(data);

    res.status(200).json({ message: 'Réservation enregistrée avec succès' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
