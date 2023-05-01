// Import des modules nécessaires
const modelNote = require('../models/modelNote');
const modelMatiere = require('../models/modelMatiere');
const modelEleve = require('../models/modelConnexionEleve');
const cookieParser = require('cookie-parser');

const controllerClasse = {

    //Fonction pour tout utilisateur identifié : permet d'afficher les notes d'un élève
    //Le principal a accès à toutes les notes de n'importe quel élève
    //Les professeurs n'ont accès aux notes de leurs élèves que si ils sont leur professeur principal
    //Les élèves ne peuvent accéder qu'à leurs notes
    // async affichageNote(req, res) {

    //     //Sécurité au niveau du serveur : si utilisateur identifié renvoit les données, sinon renvoit sur une page de refus
    //     if (req.cookies.role == "Principal" || req.cookies.role == "Professeur" || req.cookies.role == "Eleve") {

    //         try {
    //             const data1 = await modelNote.Notes.afficherNotesEleve(req, res)
    //             const data2 = await modelMatiere.Matieres.afficherMatieres()
    //             if (data1) {
    //                 res.render("suiviNotes", { dataNotes: data1, dataMatieres: data2, cookie: req.cookies.role, idEleve: req.cookies.idEleve })

    //             } else {
    //                 res.render("probleme", { cookie: req.cookies.role })
    //             }

    //         } catch (error) {

    //             console.log(error)
    //         }

    //     } else {

    //         try {

    //             res.render("refus")

    //         } catch (error) {

    //             console.log(error)
    //         }
    //     }
    // },

    async afficherToutesLesNotes(req, res) {
        if (req.cookies.role == "Principal" || req.cookies.role == "Professeur" || req.cookies.role == "Eleve") {
            try {
                const dataListeNotes = await modelNote.Notes.afficherToutesNotes(req)
                if (dataListeNotes) {
                    res.render("suiviNotes", { dataListeNotes: dataListeNotes, cookie: req.cookies.role })
                } else {
                    res.render("probleme")
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

    // async redirectionNoteEleve(req, res) {

    //     if (req.cookies.role == "Eleve") {

    //         res.redirect("/notes/notesEleve/" + req.cookies.id);

    //     } else {

    //         res.render("refus")
    //     }
    // },


    //Fonction pour le principal ou professeur : permet d'afficher une note en particulier
    //Le principal peut afficher n'importe quelle note
    //Le professeur ne peut afficher de notes que dans sa matière
    async affichageUneNote(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal" || req.cookies.role == "Professeur") {

            try {

                const dataNote = await modelNote.Notes.afficherUneNote(req)

                if (dataNote) {

                    res.render("modifierNotes", { dataNote: dataNote, cookie: req.cookies.role })

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

    async afficherAjouterNotes(req, res) {

        const dataListeEleves = await modelEleve.ConnexionEleve.afficherLesEleves(req)
        const dataListeMatieres = await modelMatiere.Matieres.listeMatieres(req)

        if (req.cookies.role == "Principal" || req.cookies.role == "Professeur") {
            res.render("addNotes", { dataListeEleves: dataListeEleves, dataListeMatieres: dataListeMatieres });
        } else {
            res.render("refus")
        }
    },

    //Fonction pour le principal ou professeur : permet d'ajouter une note
    //Le principal peut ajouter n'importe quelle note
    //Le professeur ne peut ajouter de notes que dans sa matière
    async ajouterNote(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal" || req.cookies.role == "Professeur") {

            try {

                const data = await modelNote.Notes.ajouterNotes(req)
                const dataListeNotes = await modelNote.Notes.afficherToutesNotes(req)
                console.log(req.cookies.role)

                if (data) {

                    res.render("suiviNotes", { dataListeNotes: dataListeNotes, cookie: req.cookies.role });

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

    //Fonction pour le principal ou professeur : permet de supprimer une note
    //Le principal peut supprimer n'importe quelle note
    //Le professeur ne peut supprimer que les notes dans sa matière
    async supprimerNote(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal" || req.cookies.role == "Professeur") {

            try {

                const data = await modelNote.Notes.supprimerNote(req)
                const dataListeNotes = await modelNote.Notes.afficherToutesNotes(req)

                if (data) {

                    res.render("suiviNotes", { dataListeNotes: dataListeNotes, cookie: req.cookies.role });

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

    // async afficherModifierNote(req, res) {
    //     if (req.cookies.role == "Principal" || req.cookies.role == "Professeur") {
    //         res.render('modifierNotes');
    //     } else {
    //         res.render("refus")
    //     }
    // },

    //Fonction pour le principal ou professeur : permet de modifier une note
    //Le principal peut modifier n'importe quelle note
    //Le professeur ne peut modifier que les notes de sa matière
    async modifierNote(req, res) {

        //Sécurité au niveau du serveur : si token principal renvoit les données, sinon renvoit sur une page de refus
        if (req.cookies.role == "Principal" || req.cookies.role == "Professeur") {

            try {

                const data = await modelNote.Notes.modifierNote(req)
                console.log(data)
                const dataListeNotes = await modelNote.Notes.afficherToutesNotes(req)

                if (data) {

                    res.render("suiviNotes", { dataListeNotes: dataListeNotes, cookie: req.cookies.role });

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
