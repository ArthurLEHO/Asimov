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

const Notes = {

    //Fonction pour tous les utilisateurs : permet d'afficher toutes les notes d'un élève en particulier
    async afficherNotesEleve(req, res) {

        let id = req.params.el_id
        let requeteSQL = "SELECT nt_id, el_id, nt_resultat, DATE_FORMAT(nt_date, '%d/%m/%Y') as nt_date, mt_nom, el_nom, el_prenom, mt_id FROM eleves INNER JOIN notes ON eleves.el_id = notes.nt_idEleve INNER JOIN matieres ON notes.nt_matiere = matieres.mt_id WHERE eleves.el_id = ?; "

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le principal ou les professeurs : permet d'afficher une note en particulier
    async afficherUneNote(req) {

        let id = req.params.nt_id
        let requeteSQL = "SELECT nt_id, el_id, nt_resultat, DATE_FORMAT(nt_date, '%d/%m/%Y') as nt_date, mt_nom, el_nom, el_prenom, mt_id FROM notes, eleves, matieres WHERE nt_idEleve = el_id AND nt_matiere = mt_id AND nt_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    async afficherToutesNotes(req) {

        let requeteSQL = "SELECT nt_id, nt_resultat, DATE_FORMAT(nt_date, '%d/%m/%Y') as nt_date, mt_nom, el_nom, el_prenom FROM notes, eleves, matieres WHERE nt_idEleve = el_id AND nt_matiere = mt_id"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le principal ou les professeurs : permet d'ajouter une note à un élève
    async ajouterNotes(req) {
        const dateInput = req.body.nt_date;
        const date = new Date(dateInput);
        let dateBonFormat = date.toISOString().slice(0, 10);

        let eleve = req.body.idEleve
        let matiere = req.body.idMatiere
        let resultat = req.body.nt_resultat

        let requeteSQL = "INSERT INTO notes (nt_idEleve, nt_matiere, nt_resultat, nt_date) VALUES(?,?,?,?)"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [eleve, matiere, resultat, dateBonFormat], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal ou les professeurs : permet de supprimer une note à un élève
    async supprimerNote(req) {

        let id = req.params.nt_id
        let requeteSQL = "DELETE FROM notes WHERE nt_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal ou les professeurs : permet de modifier une note d'un élève
    async modifierNote(req) {

        let id = req.params.nt_id
        let resultat = req.body.nt_resultat
        console.log(resultat, id)
        let requeteSQL = "UPDATE notes SET nt_resultat = ? WHERE nt_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [resultat, id], (err, lignes, champs) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    Notes
}