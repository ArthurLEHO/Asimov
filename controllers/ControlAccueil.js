const modelAccueil = require('../models/modelAccueil');

const controllerMain = {

	affichageAccueil(req, res){

		try {

            res.render("accueil")

		} catch (error) {

			console.log(error)
		}
	}
}

module.exports = controllerMain