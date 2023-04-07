const modelAccueil = require('../models/modelAccueil');

const controllerMain = {

	affichageAccueil(req, res) {
		res.render("accueil");
	},

	affichageConnexion(req, res) {
		res.render("connexion");
	},

	async controleConnexionDirecteur(req, res) {
		try {
			const data = await modelAccueil.Accueil.connexion();

			let pseudo = req.body.pseudo;
			let mdp = req.body.mdp;
			let statut = req.body.statut;

			for (const element of data) {
				if (element.nom === pseudo && element.motdepasse === mdp && element.statut === statut) {
					res.render("accueil");
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
