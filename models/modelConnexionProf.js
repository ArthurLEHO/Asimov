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

const ConnexionProf = {

    async connexion() {

        return new Promise((resolve, reject) => {

            let requeteSQL = "SELECT * FROM personnelscolaires WHERE ps_statut = 'Professeur'"

            mysqlconnexion.query(requeteSQL, (err, lignes) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal : permet d'afficher la liste des professeurs
    async afficherProfesseurs() {

        let requeteSQL = "SELECT * FROM personnelscolaires WHERE ps_statut = 'Professeur' ORDER BY ps_nom"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le principal : permet d'afficher chaque professeur avec la matière qu'il enseigne'
    async afficherProfesseurs2() {

        let requeteSQL = "SELECT ps_id, ps_nom, ps_prenom, mt_nom FROM personnelscolaires LEFT JOIN matieres ON personnelscolaires.ps_idMatiere = matieres.mt_id WHERE ps_statut = 'Professeur' ORDER BY ps_nom"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le principal : permet d'afficher un professeur en particulier
    async afficherUnProfesseur(req) {

        let id = req.params.ps_id
        let requeteSQL = "SELECT * FROM personnelscolaires WHERE ps_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (err, lignes) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal : permet d'ajouter un professeur à l'établissement
    async ajouterProfesseur(req) {

        let nom = req.body.prof_nom
        let prenom = req.body.prof_prenom
        let mdp = req.body.prof_mdp
        let matiere = req.body.listematieres
        let requeteSQL = "INSERT INTO personnelscolaires (ps_nom, ps_prenom, ps_motdepasse, ps_statut, ps_idMatiere) VALUES(?,?, ?, 'Professeur', ?)"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prenom, mdp, matiere], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal : permet de supprimer un professeur de l'établissement
    async supprimerProfesseur(req) {

        let id = req.params.ps_id
        let requeteSQL = "DELETE FROM personnelscolaires WHERE ps_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal : permet de modifier un professeur de l'établissement
    async modifierProfesseur(req) {

        let id = req.params.ps_id
        let nom = req.body.prof_nom
        let prenom = req.body.prof_prenom
        let mdp = req.body.prof_mdp
        let idMatiere = req.body.listematieres
        let requeteSQL = "UPDATE personnelscolaires SET ps_nom = ?, ps_prenom = ?, ps_motdepasse = ?, ps_idMatiere = ? WHERE ps_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prenom, mdp, idMatiere, id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    ConnexionProf
}