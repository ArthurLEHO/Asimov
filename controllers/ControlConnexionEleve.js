const modelConnexionEleve = require('../models/modelConnexionEleve');
const modelClasse = require('../models/modelClasse');
const cookieParser = require('cookie-parser');
const controllerConnexionEleve = {

	//Fonction qui affiche la page de connexion
	affichageConnexionEleve(req, res) {
		res.render("connexionEleve");
	},

	affichageSuiviNotes(req, res) {
		res.render("suiviNotes");
	},

	//Fonction qui permet de vérifier les données pour s'authentifier
	async controleConnexion(req, res) {

		try {

			const data = await modelConnexionEleve.ConnexionEleve.connexion()

			let pseudo = req.body.pseudo
			let mdp = req.body.mdp

			for (element in data) {

				if (data[element].el_nom == pseudo && data[element].el_motdepasse == mdp) {

					res.cookie('role', 'Eleve')
					res.cookie('id', data[element].el_id)
					res.render("menuEleve", { dataEleve: data[element], cookie: 'Eleve', id: data[element].el_id })
					return
				}
			}

			res.render("connexionEleve")

		} catch (error) {

			console.log(error)
		}
	},

	//Fonction pour le principal : permet d'afficher les élèves de l'établissement
	async affichageEleves(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const dataEleves = await modelConnexionEleve.ConnexionEleve.afficherLesEleves(req)

				if (dataEleves) {

					res.render("eleves", { cookie: req.cookies.role, dataEleves: dataEleves })

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

	//Fonction pour le principal ou les professeurs : permet d'afficher les élèves d'une classe de l'établissement
	async afficherElevesClasse(req, res) {

		//Sécurité au niveau du serveur : si token principal ou professeur renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal" || req.cookies.role == "Professeur") {

			try {

				const data1 = await modelConnexionEleve.ConnexionEleve.afficherElevesClasse(req, res)

				if (data1) {

					res.render("afficherUneClasse", { cookie: req.cookies.role, dataClasse: data1, idClasse: req.cookies.idClasse })

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

	//Fonction pour le principal : permet d'afficher un élève en particulier
	async affichageUnEleve(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelConnexionEleve.ConnexionEleve.afficherUnEleve(req)
				const data2 = await modelClasse.Classes.afficherToutesClasses()

				if (data) {

					res.render("modifierEleves", { dataEleve: data, dataListeClasses: data2 })

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

	async afficherAjouterEleve(req, res) {
		const dataListeClasses = await modelClasse.Classes.afficherToutesClasses(req)
		if (req.cookies.role == "Principal") {
			res.render("addEleve", { dataListeClasses: dataListeClasses })
		} else {
			res.render("refus")
		}
	},

	//Fonction pour le principal : permet d'ajouter un élève
	async ajouterEleve(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelConnexionEleve.ConnexionEleve.ajouterEleve(req)

				if (data) {

					res.render("menuDirection")

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

	//Fonction pour le principal : permet de supprimer un élève
	async supprimerEleve(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelConnexionEleve.ConnexionEleve.supprimerEleve(req)
				const dataEleves = await modelConnexionEleve.ConnexionEleve.afficherLesEleves(req)

				if (data) {

					res.render("eleves", { dataEleves: dataEleves });

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

	//Fonction pour le principal : permet de modifier un élève
	async modifierEleve(req, res) {

		//Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
		if (req.cookies.role == "Principal") {

			try {

				const data = await modelConnexionEleve.ConnexionEleve.modifierEleve(req)
				const dataEleves = await modelConnexionEleve.ConnexionEleve.afficherLesEleves(req)

				if (data) {

					res.render("eleves", { dataEleves: dataEleves });

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

module.exports = controllerConnexionEleve