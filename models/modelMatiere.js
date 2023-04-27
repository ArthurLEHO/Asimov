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

const Matieres = {

    //Fonction pour le proviseur : permet d'afficher chaque matière avec le professeur qui l'enseigne

    async listeMatieres() {
        let requeteSQL = "SELECT mt_id, mt_nom FROM matieres"

        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requeteSQL, (error, elements) => {
                if (error) {
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    },

    //Fonction pour le proviseur : permet d'afficher une matière en particulier
    async afficherUneMatiere(req) {

        let id = req.params.id
        let requeteSQL = "SELECT * FROM matieres WHERE mt_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le proviseur : permet d'ajouter une matière en particulier
    async ajouterMatiere(req) {

        let nom = req.body.nom
        let requeteSQL = "INSERT INTO matieres (mt_nom) VALUES(?)"

        return new Promise((resolve, reject) => {
            
            mysqlconnexion.query(requeteSQL, [nom], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le proviseur : permet de supprimer une matière en particulier
    async supprimerMatiere(req) {

        let id = req.params.id
        let requeteSQL = "DELETE FROM matieres WHERE mt_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le proviseur : permet de modifier une matière en particulier
    async modifierMatiere(req) {

        let id = req.params.id
        let nom = req.body.nom
        let professeur = req.body.professeur
        let requeteSQL = "UPDATE matieres SET mt_nom = ?, mt_IdProfesseur = ? WHERE mt_id = ?"

        return new Promise((resolve, reject) => {

            //Si le professeur est renseigné dans le body alors la matière lui est attribuée
            if (professeur) {

                mysqlconnexion.query(requeteSQL, [nom, professeur, id], (err, lignes, champs) => {

                    if (err) {

                        return reject(err)

                    }

                    return resolve(lignes)

                })

                //Sinon dans la table matiere, la colonne matiere_IdProfesseur est créée à NULL
            } else {

                mysqlconnexion.query(requeteSQL, [nom, null, id], (err, lignes, champs) => {

                    if (err) {

                        return reject(err)

                    }

                    return resolve(lignes)

                })
            }
        })
    }
}

module.exports = {

    Matieres
}