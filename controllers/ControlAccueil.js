const modelAccueil = require('../models/modelAccueil');

const controllerMain = {

	affichageAccueil(req, res) {
		res.render("accueil");
	},

	affichageConnexion(req, res) {
		res.render("connexion");
	},

	async controleConnexion(req, res) {
		try {
			const data = await modelAccueil.Accueil.connexion();

			let pseudo = req.body.pseudo;
			let mdp = req.body.mdp;

			for (const element of data) {
				if (element.el_nom == pseudo && element.el_motdepasse == mdp) {
					res.render("menu");
					return;
				}
			}

			res.render("connexion");

		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = controllerMain;
