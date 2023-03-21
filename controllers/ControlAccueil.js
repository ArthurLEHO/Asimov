const modelAccueil = require('../models/modelAccueil');

const controllerMain = {
	
	async controleConnexion(req, res){

		try{

			const data = await modelAccueil.Accueil.connexion()

			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			for(element in data){

				if(data[element].Pharmacien_NomUtilisateur == pseudo && data[element].Pharmacien_MotDePasse == mdp){

					res.render("main")
					return
				}
			}

			res.render("connexion")

		} catch (error) {

			console.log(error)
		}
	},

	affichageAccueil(req, res){

		try {

            res.render("connexion")

		} catch (error) {

			console.log(error)
		}
	}
}

module.exports = controllerMain