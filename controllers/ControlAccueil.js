const modelAccueil = require('../models/modelAccueil');

const controllerMain = {

	affichageAccueil(req, res) {
		res.render("accueil");
	},
};

module.exports = controllerMain;
