const modelConnexionDirecteur = require('../models/modelConnexionDirecteur');

const controllerConnexionDirecteur= {

	affichageConnexionDirecteur(req, res) {
		res.render("connexionDirecteur");
	},
	
	async controleConnexion(req, res){

		try{

			const data = await modelConnexionDirecteur.ConnexionDirecteur.connexion()

			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			for(element in data){

				if(data[element].ps_nom == pseudo && data[element].ps_motdepasse == mdp){

					res.cookie('role', data[0].ps_statut)
					res.cookie('id', data[0].ps_id)
					res.render("menuDirection", {dataDirecteur:data[element], cookie:data[element].ps_statut})
					return
				}
			}

			res.render("connexionDirecteur")

		} catch (error) {

			console.log(error)
		}
	},
}

module.exports = controllerConnexionDirecteur