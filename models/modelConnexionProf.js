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

const ConnexionProf = {

    async connexion() {

        return new Promise((resolve, reject) => {

            let requeteSQL = "SELECT ps_nom, ps_motdepasse FROM personnelscolaires WHERE ps_statut = 'Professeur'"

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

        let requeteSQL = "SELECT * FROM professeur ORDER BY professeur_Nom"

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

        let requeteSQL = "SELECT * FROM professeur LEFT JOIN matiere ON professeur_Id = matiere_IdProfesseur ORDER BY professeur_Nom"

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

        let id = req.params.id
        let requeteSQL = "SELECT * FROM professeur WHERE professeur_Id = ?"

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

        let nom = req.body.nom
        let prenom = req.body.prenom
        let mdp = req.body.mdp
        let requeteSQL = "INSERT INTO professeur (professeur_Nom, professeur_Prenom, professeur_Mdp, professeur_Role) VALUES(?,?, password(?), 'Professeur')"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prenom, mdp], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal : permet de supprimer un professeur de l'établissement
    async supprimerProfesseur(req) {

        let id = req.params.id
        let requeteSQL = "DELETE FROM professeur WHERE professeur_Id = ?"

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

        let id = req.params.id
        let nom = req.body.nom
        let prenom = req.body.prenom
        let requeteSQL = "UPDATE professeur SET professeur_Nom = ?, professeur_Prenom = ? WHERE professeur_Id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [nom, prenom, id], (err, lignes, champs) => {

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