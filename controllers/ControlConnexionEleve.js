const modelConnexionEleve = require('../models/modelConnexionEleve');

const controllerConnexionEleve= {

    affichageConnexionEleve(req, res) {
		res.render("connexionEleve");
	},
	
	async controleConnexion(req, res){

		try{

			const data = await modelConnexionEleve.ConnexionEleve.connexion()

			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			for(element in data){

				if(data[element].el_nom == pseudo && data[element].el_motdepasse == mdp){

					res.render("menuEleve")
					return
				}
			}

			res.render("connexionEleve")

		} catch (error) {

			console.log(error)
		}
	},
}

module.exports = controllerConnexionEleve