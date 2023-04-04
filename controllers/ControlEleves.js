const modele = require('../models/modelEleves.js');

const test_eleves = (req, res) => {
    modele.find()
}

module.exports = {
    test_eleves,
}