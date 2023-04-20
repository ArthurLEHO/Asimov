const mysql = require('mysql')
const iniparser = require('iniparser')
let configDB = iniparser.parseSync('./DB.ini')

let mysqlconnexion = mysql.createConnection({

    host: configDB['dev']['host'],
    user: configDB['dev']['user'],
    password: configDB['dev']['password'],
    database: configDB['dev']['database']

});

mysqlconnexion.connect((err) => {

    if (err) console.log('BDD connexion échouée \n Erreur: ' + JSON.stringify(err))

})

const ConnexionEleve = {

    async connexion() {

        return new Promise((resolve, reject) => {

            let requeteSQL = "SELECT * FROM eleves"

            mysqlconnexion.query(requeteSQL, (err, lignes) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le proviseur : permet d'afficher tous les élèves de l'établissement dans l'ordre alphabétique
    async afficherLesEleves() {

        let requeteSQL = "SELECT * FROM eleve ORDER BY el_Nom"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })

    },

    //Fonction pour le proviseur : permet d'afficher un élève en particulier de l'établissement
    async afficherUnEleve(req) {

        let id = req.params.id
        let requeteSQL = "SELECT * FROM eleve INNER JOIN classe ON eleve_IdClasse = classe_Id WHERE eleve_Id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le proviseur et les professeurs : permet d'afficher les élèves d'une classe en particulier
    async afficherElevesClasse(req, res) {

        let id = req.params.id
        let requeteSQL = "SELECT * FROM eleve WHERE eleve_IdClasse = ? ORDER BY el_Nom"

        //On initialise un cookie pour pouvoir retrouver la classe dans la redirection depuis le controller
        res.cookie('idClasse', id)

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le proviseur : permet d'afficher un élève dans une classe de l'établissement
    async ajouterEleve(req) {

        let nom = req.body.nom
        let prenom = req.body.prenom
        let classe = req.body.classe
        let requeteSQL = "INSERT INTO eleve (el_Nom, el_Prenom, el_IdClasse) VALUES(?,?,?,?)"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prenom, classe], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le proviseur : permet de supprimer un élève de l'établissement
    async supprimerEleve(req) {

        let id = req.params.id
        let requeteSQL = "DELETE FROM eleve WHERE el_Id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le proviseur : permet de modifier un élève de l'établissement
    async modifierEleve(req) {

        let id = req.params.id
        let nom = req.body.nom
        let prenom = req.body.prenom
        let classe = req.body.classe

        let requeteSQL = "UPDATE eleve SET el_Nom = ?, el_Prenom = ?, el_IdClasse = ? WHERE el_Id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prenom, age, classe, id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    ConnexionEleve
}