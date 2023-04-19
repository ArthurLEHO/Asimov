const modelConnexionProf = require('../models/modelConnexionProf');

const controllerConnexionProf= {

    affichageConnexionProf(req, res) {
		res.render("connexionProf");
	},
	
	async controleConnexion(req, res){

		try{

			const data = await modelConnexionProf.ConnexionProf.connexion()

			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			for(element in data){

				if(data[element].ps_nom == pseudo && data[element].ps_motdepasse == mdp){

					res.render("menuProf")
					return
				}
			}

			res.render("connexionProf")

		} catch (error) {

			console.log(error)
		}
	},
}

module.exports = controllerConnexionProf