// Importer le modèle pour la connexion directeur
const modelConnexionDirecteur = require('../models/modelConnexionDirecteur');

// Importer le middleware cookie-parser
const cookieParser = require('cookie-parser');

// Définir le contrôleur pour la connexion directeur
const controllerConnexionDirecteur = {

	// Méthode pour afficher la vue de connexion directeur
	affichageConnexionDirecteur(req, res) {
		res.render("connexionDirecteur");
	},

	// Méthode pour contrôler la connexion directeur
	async controleConnexion(req, res) {

		try {

			// Appeler la méthode de connexion du modèle pour récupérer les données
			const data = await modelConnexionDirecteur.ConnexionDirecteur.connexion()

			// Récupérer les données du formulaire de connexion
			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			// Parcourir les données de la base de données pour trouver un utilisateur avec les mêmes identifiants
			for (element in data) {
				console.log(data[element])
				if (data[element].ps_nom == pseudo && data[element].ps_motdepasse == mdp) {

					// Définir les cookies pour stocker le rôle et l'ID de l'utilisateur
					res.cookie('role', data[element].ps_statut)
					res.cookie('id', data[element].ps_id)

					// Afficher la vue du menu direction avec les données de l'utilisateur et les cookies
					res.render("menuDirection", { dataDirecteur: data[element], cookie: data[element].ps_statut })
					return
				}
			}

			// Si aucun utilisateur n'a été trouvé, afficher la vue de connexion directeur à nouveau
			res.render("connexionDirecteur")

		} catch (error) {

			console.log(error)
		}
	},
}

// Exporter le contrôleur pour la connexion directeur
module.exports = controllerConnexionDirecteur
