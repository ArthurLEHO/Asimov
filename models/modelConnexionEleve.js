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

        let requeteSQL = "SELECT el_id, el_nom, el_prenom, cl_nom FROM eleves, classes WHERE el_idClasse = cl_id ORDER BY cl_nom"

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

        let id = req.params.el_id
        let requeteSQL = "SELECT * FROM eleves INNER JOIN classes ON el_idClasse = cl_id WHERE el_id = ?"

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
        let requeteSQL = "SELECT * FROM eleves WHERE el_idClasse = ? ORDER BY el_nom"

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

        let nom = req.body.el_nom
        let prenom = req.body.el_prenom
        let classe = req.body.el_idClasse
        let mdp = req.body.el_mdp
        let requeteSQL = "INSERT INTO eleves (el_nom, el_prenom, el_idClasse, el_motdepasse) VALUES(?,?,?,?)"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prenom, classe, mdp], (err, lignes, champs) => {

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
        let requeteSQL = "DELETE FROM eleves WHERE el_id = ?"

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

        let id = req.params.el_id
        let el_nom = req.body.el_nom
        let el_prenom = req.body.el_prenom
        let el_idClasse = req.body.el_idClasse
        let el_mdp = req.body.el_mdp

        let requeteSQL = "UPDATE eleves SET el_nom = ?, el_prenom = ?, el_idClasse = ?, el_motdepasse = ? WHERE el_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [el_nom, el_prenom, el_idClasse, el_mdp, id], (err, lignes, champs) => {

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