const modelAddMatiere = require('../models/modelAddMatiere');

const controllerMain = {
	
    affichageMenu(req, res) {
		res.render("menu");
	},

	affichageAddMatiere(req, res) {
		res.render("addMatiere");
	},

};

module.exports = controllerMain;
