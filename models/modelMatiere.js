// Importer les modules mysql et iniparser
const mysql = require('mysql')
const iniparser = require('iniparser')

// Charger la configuration de la base de données depuis le fichier DB.ini
let configDB = iniparser.parseSync('./DB.ini')

// Créer une connexion à la base de données MySQL en utilisant les paramètres de configuration chargés depuis le fichier
let mysqlconnexion = mysql.createConnection({

    host: configDB['dev']['host'],
    user: configDB['dev']['user'],
    password: configDB['dev']['password'],
    database: configDB['dev']['database']

});

// Établir la connexion à la base de données MySQL
mysqlconnexion.connect((err) => {
    // Si une erreur se produit, afficher un message d'erreur avec le détail de l'erreur en format JSON
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

        let id = req.params.mt_id
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

        let id = req.params.mt_id
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

        let id = req.params.mt_id
        let nom = req.body.nom
        let requeteSQL = "UPDATE matieres SET mt_nom = ? WHERE mt_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },
}

module.exports = {

    Matieres
}