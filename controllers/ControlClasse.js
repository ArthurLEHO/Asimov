// Importation des classes de modèles pour les classes, les professeurs et les directeurs
const modelClasses = require('../models/modelClasse');
const modelProfesseurs = require('../models/modelConnexionProf');
const modelDirecteur = require('../models/modelConnexionDirecteur');

// Importation du module cookie-parser pour la gestion des cookies
const cookieParser = require('cookie-parser');

const controllerClasse = {

    //Fonction pour les professeurs : permet d'afficher les classes d'un professeur
    async affichageMesClasses(req, res) {

        //Sécurité au niveau du serveur : si token professeur renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Professeur") {

            try {

                const data1 = await modelClasses.Classes.afficherMesClasses(req)

                if (data1) {

                    res.render("classes", { dataClasse: data1, cookie: req.cookies.role })

                } else {

                    console.log("problème de récupération")
                    res.render("accueil")
                }

            } catch (error) {

                console.log(error)
            }

        } else {

            try {

                res.render('refus')

            } catch (error) {

                console.log(error)
            }
        }
    },

    //Fonction pour le principal : permet d'afficher toutes les classes de l'établissement
    async affichageToutesClasses(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal") {

            try {

                const dataListeClasses = await modelClasses.Classes.afficherToutesClasses()

                if (dataListeClasses) {

                    res.render("classes", { dataListeClasses: dataListeClasses, cookie: req.cookies.role })

                } else {

                    res.render("menuDirection")
                }

            } catch (error) {

                console.log(error)
            }

        } else {

            try {

                res.render('refus')

            } catch (error) {

                console.log(error)
            }
        }
    },      

    //Fonction pour le principal : permet d'afficher une classe de l'établissement en particulier
    async affichageUneClasse(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal") {

            try {

                const data1 = await modelClasses.Classes.afficherUneClasse(req)
                const data2 = await modelProfesseurs.Professeurs.afficherProfesseurs()

                if (data1) {

                    res.render("modifierClasses", { dataClasse: data1, cookie: req.cookies.role, dataProfesseur: data2 })

                } else {

                    res.render("accueil")
                }

            } catch (error) {

                console.log(error)
            }

        } else {

            try {

                res.render('refus')

            } catch (error) {

                console.log(error)
            }
        }
    },

    async afficherAjouterClasse(req, res) {
        const dataListeProfs = await modelProfesseurs.ConnexionProf.afficherProfesseurs(req)

        if (req.cookies.role == "Principal") {
            res.render('addClasse', {dataListeProfs: dataListeProfs})
        } else {
            res.render('refus')
        }
    },

    //Fonction pour le principal : permet d'ajouter une classe à l'établissement
    async ajouterClasse(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal") {

            try {

                const data = await modelClasses.Classes.ajouterClasse(req)

                if (data) {

                    res.render("menuDirection");

                } else {

                    console.log("champs incorrects")
                    res.redirect("/classes");
                }

            } catch (error) {

                console.log(error)
            }

        } else {

            try {

                res.render('refus')

            } catch (error) {

                console.log(error)
            }
        }
    },

    //Fonction pour le principal : permet de supprimer une classe de l'établissement
    async supprimerClasse(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal") {

            try {

                const data = await modelClasses.Classes.supprimerClasse(req)

                if (data) {

                    res.redirect("/classes/principal");

                } else {

                    console.log("champs incorrects")
                    res.redirect("/classes/principal");
                }

            } catch (error) {

                console.log(error)
            }

        } else {

            try {

                res.render('refus')

            } catch (error) {

                console.log(error)
            }
        }
    },

    //Fonction pour le principal : permet de supprimer une classe de l'établissement
    async modifierClasse(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal") {

            try {

                const data = await modelClasses.Classes.modifierClasse(req)

                if (data) {

                    res.redirect("/classes/principal");

                } else {

                    res.redirect("/classes/modifierClasse/" + req.params.id);
                }

            } catch (error) {

                console.log(error)
            }

        } else {

            try {

                res.render('refus')

            } catch (error) {

                console.log(error)
            }
        }
    }
}

module.exports = controllerClasse
