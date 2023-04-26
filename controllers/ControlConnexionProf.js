const modelConnexionProf = require('../models/modelConnexionProf');
const modelMatiere = require('../models/modelMatiere');
const cookieParser = require('cookie-parser');

const controllerConnexionProf = {

	affichageConnexionProf(req, res) {
		res.render("connexionProf");
	},

	async controleConnexion(req, res) {

		try {

			const data = await modelConnexionProf.ConnexionProf.connexion()

			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			for (element in data) {

				if (data[element].ps_nom == pseudo && data[element].ps_motdepasse == mdp) {

					res.cookie('role', data[element].ps_statut)
					res.cookie('id', data[element].ps_id)
					res.render("menuProf", { dataProf: data[element], cookie: data[element].ps_statut })
					return
				}
			}

			res.render("connexionProf")

		} catch (error) {

			console.log(error)
		}
	},

	//Fonction pour le principal : permet d'afficher les professeurs de l'établissement
	async affichageProfesseurs(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data1 = await modelProfesseur.Professeurs.afficherProfesseurs2()

				if (data1) {

					res.render("professeurs", { cookie: req.cookies.role, dataTotale: data1 })

				} else {

					res.render("probleme", { cookie: req.cookies.role })
				}

			} catch (error) {

				console.log(error)
			}

		} else {

			try {

				res.render("refus")

			} catch (error) {

				console.log(error)
			}
		}
	},

	//Fonction pour le principal : permet d'afficher un professeur en particulier
	async affichageUnProfesseur(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data1 = await modelProfesseur.Professeurs.afficherUnProfesseur(req)
				const data2 = await modelMatiere.Matieres.afficherMatieres()

				if (data1) {

					res.render("modifierProfesseurs", { dataProfesseur: data1, dataMatiere: data2 })

				} else {

					res.render("probleme", { cookie: req.cookies.role })
				}

			} catch (error) {

				console.log(error)
			}

		} else {

			try {

				res.render("refus")

			} catch (error) {

				console.log(error)
			}
		}
	},

	async afficherAjouterProfesseur(req, res) {
		const dataListeMatieres = await modelMatiere.Matieres.listeMatieres(req)
		if (req.cookies.role == "Principal") {
			res.render('addProfesseur', {dataListeMatieres: dataListeMatieres})
		} else {
			res.render('refus')
		}
	},

	//Fonction pour le principal : permet d'ajouter un professeur à l'établissement
	async ajouterProfesseur(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelConnexionProf.ConnexionProf.ajouterProfesseur(req)

				if (data) {

					res.render("professeurs");

				} else {

					res.render("probleme", { cookie: req.cookies.role })
				}

			} catch (error) {

				console.log(error)
			}

		} else {

			try {

				res.render("refus")

			} catch (error) {

				console.log(error)
			}
		}
	},

	//Fonction pour le principal : permet de supprimer un professeur de l'établissement
	async supprimerProfesseur(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelProfesseur.Professeurs.supprimerProfesseur(req)

				if (data) {

					res.redirect("/professeurs");

				} else {

					res.render("probleme", { cookie: req.cookies.role })
				}

			} catch (error) {

				console.log(error)
			}

		} else {

			try {

				res.render("refus")

			} catch (error) {

				console.log(error)
			}
		}
	},

	//Fonction pour le principal : permet de modifier un professeur de l'établissement
	async modifierProfesseur(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelProfesseur.Professeurs.modifierProfesseur(req)

				if (data) {

					res.redirect("/professeurs");

				} else {

					res.render("probleme", { cookie: req.cookies.role })
				}

			} catch (error) {

				console.log(error)
			}

		} else {

			try {

				res.render("refus")

			} catch (error) {

				console.log(error)
			}
		}
	}
}

module.exports = controllerConnexionProf