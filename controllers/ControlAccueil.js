const modelAccueil = require('../models/modelAccueil');

const controllerMain = {

	affichageAccueil(req, res) {
		res.render("accueil");
	},

	//Fonction pour tout utilisateur identifié : permet de se déconnecter en supprimant tous les cookies de session
	deconnexion(req, res){

		try{

			res.clearCookie("role");
			res.clearCookie("id");
			res.clearCookie("idEleve");
			res.clearCookie("idClasse");
			
            res.render("accueil")

		}catch(error){

			console.log(error)
		}
	}
};

module.exports = controllerMain;
