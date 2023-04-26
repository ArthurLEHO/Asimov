const modelMatiere = require('../models/modelMatiere');
const modelProfesseurs = require('../models/modelConnexionProf');
const modelDirecteur = require('../models/modelConnexionDirecteur');
const cookieParser = require('cookie-parser');

const controllerClasse = {

	//Fonction pour le principal : permet d'afficher les matières
	async affichageMatiere(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data1 = await modelMatiere.Matieres.afficherMatieres()
				const data2 = await modelProfesseurs.Professeurs.afficherProfesseurs()

				if (data1) {

					res.render("matieres", { dataMatiere: data1, cookie: req.cookies.role, dataProfesseur: data2 })

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

	//Fonction pour le principal : permet d'afficher une matière
	async affichageUneMatiere(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data1 = await modelMatiere.Matieres.afficherUneMatiere(req)
				const data2 = await modelProfesseurs.Professeurs.afficherProfesseurs()

				if (data1) {

					res.render("modifierMatieres", { dataMatiere: data1, cookie: req.cookies.role, dataProfesseur: data2 })

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

	async afficherAjouterMatiere(req, res) {
		if (req.cookies.role == "Principal") {
			res.render("addMatiere")
		} else {
			res.render('refus')
		}
	},

	//Fonction pour le principal : permet d'ajouter une matière
	async ajouterMatiere(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelMatiere.Matieres.ajouterMatiere(req)

				if (data) {

					res.redirect("/matieres");

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

	//Fonction pour le principal : permet de supprimer une matière
	async supprimerMatiere(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelMatiere.Matieres.supprimerMatiere(req)

				if (data) {

					res.redirect("/matieres");

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

	//Fonction pour le principal : permet de modifier une matière
	async modifierMatiere(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelMatiere.Matieres.modifierMatiere(req)

				if (data) {

					res.redirect("/matieres");

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

module.exports = controllerClasse
