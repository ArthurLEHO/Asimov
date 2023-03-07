const modele = require('../models/modelAccueil.js');

const test_accueil = (req, res) => {
    modele.find()
}

module.exports = {
    test_accueil,
}