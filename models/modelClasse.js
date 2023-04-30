// Importer le module mysql pour interagir avec la base de données MySQL
const mysql = require('mysql')

// Importer le module iniparser pour lire le fichier de configuration DB.ini
const iniparser = require('iniparser')

// Parser le fichier de configuration DB.ini pour récupérer les informations de connexion à la base de données
let configDB = iniparser.parseSync('./DB.ini')

// Créer une connexion à la base de données MySQL en utilisant les informations de connexion du fichier de configuration
let mysqlconnexion = mysql.createConnection({

    host: configDB['dev']['host'], // L'adresse du serveur MySQL
    user: configDB['dev']['user'], // Le nom d'utilisateur MySQL
    password: configDB['dev']['password'], // Le mot de passe de l'utilisateur MySQL
    database: configDB['dev']['database'] // Le nom de la base de données MySQL à utiliser

});


mysqlconnexion.connect((err) => {

    if (err) console.log('BDD connexion échouée \n Erreur: ' + JSON.stringify(err))

})

const Classes = {

    //Fonction pour le proviseur : permet d'afficher toutes les classes de l'établissement
    async afficherToutesClasses() {

        let requeteSQL = "SELECT * FROM classes, personnelscolaires WHERE cl_IdProf = ps_id"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })

    },

    //Fonction pour les profs : permet d'afficher les classes du prof connecté
    async afficherMesClasses(req) {

        let id = req.cookies.id
        let requeteSQL = "SELECT cl_nom FROM classes, personnelscolaires WHERE cl_IdProf = ps_id AND ps_statut = 'Professeur' AND ps_id = ? "

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le proviseur : permet d'afficher une classe en particulier
    async afficherUneClasse(req) {

        let id = req.params.cl_id
        let requeteSQL = "SELECT * FROM classes WHERE cl_id = ?"
        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le proviseur : permet d'ajouter une classe
    async ajouterClasse(req) {

        let nom = req.body.cl_nom
        let prof = req.body.idProf
        let requeteSQL = "INSERT INTO classes (cl_nom, cl_IdProf) VALUES(?,?)"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prof], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le proviseur : permet de supprimer une classe
    async supprimerClasse(req) {

        let id = req.params.id
        let requeteSQL = "DELETE FROM classes WHERE cl_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le proviseur : permet de modifier une classe de l'établissement
    async modifierClasse(req) {

        let id = req.params.cl_id
        let cl_nom = req.body.cl_nom
        let cl_idProf = req.body.idProf
        let requeteSQL = "UPDATE classes SET cl_nom = ?, cl_IdProf = ? WHERE cl_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [cl_nom, cl_idProf, id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    Classes
}