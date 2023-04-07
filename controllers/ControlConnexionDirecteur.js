const modelConnexionDirecteur = require('../models/modelConnexionDirecteur');

const controllerConnexionDirecteur= {
	
	async controleConnexion(req, res){

		try{

			const data = await modelConnexionDirecteur.ConnexionDirecteur.connexion()

			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			for(element in data){

				if(data[element].nomUtilisateur == pseudo && data[element].motdepasse == mdp){

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

module.exports = controllerConnexionDirecteur