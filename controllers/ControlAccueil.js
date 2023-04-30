// Importer le modèle d'accueil
const modelAccueil = require('../models/modelAccueil');
// Importer le module cookie-parser pour gérer les cookies
const cookieParser = require('cookie-parser');

// Définir un objet controllerMain contenant des fonctions pour gérer les routes
const controllerMain = {

	// Fonction pour afficher la page d'accueil
	affichageAccueil(req, res) {
		res.render("accueil"); // Rendre la vue "accueil"
	},

	// Fonction pour déconnecter l'utilisateur en supprimant les cookies de session
	deconnexion(req, res) {

		try {
			// Supprimer les cookies de session en utilisant la méthode clearCookie de l'objet response
			res.clearCookie("role");
			res.clearCookie("id");
			res.clearCookie("idEleve");
			res.clearCookie("idClasse");

			// Rediriger l'utilisateur vers la page d'accueil
			res.render("accueil")

		} catch (error) {

			console.log(error) // Afficher l'erreur dans la console en cas de problème
		}
	}
};

// Exporter l'objet controllerMain pour l'utiliser dans d'autres fichiers
module.exports = controllerMain;
