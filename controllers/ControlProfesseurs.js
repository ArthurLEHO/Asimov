const modele = require('../models/modelProfesseurs.js');

const test_professeurs = (req, res) => {
    modele.find()
}

module.exports = {
    test_professeurs,
}