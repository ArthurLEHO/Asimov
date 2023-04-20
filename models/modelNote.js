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

const Notes = {

    //Fonction pour tous les utilisateurs : permet d'afficher toutes les notes d'un élève en particulier
    async afficherNotesEleve(req, res){

        let id = req.params.id
        let requeteSQL = "SELECT mt_nom, nt_id, nt_resultat FROM Eleves INNER JOIN Notes ON el_id = nt_idEleve INNER JOIN Matieres ON nt_matiere = mt_id WHERE el_id = ? "
        
        //On initialise un cookie pour pouvoir savoir vers quel élève rediriger dans le controller
        res.cookie('idEleve', id)

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

        let id = req.params.id
        let requeteSQL = "SELECT * FROM notes WHERE nt_id = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour le principal ou les professeurs : permet d'ajouter une note à un élève
    async ajouterNote(req){

        let eleve = req.cookies.idEleve
        let matiere = req.body.matiere
        let valeur = req.body.valeur
        let requeteSQL = "INSERT INTO notes (nt_idEleve, nt_matiere, nt_resultat) VALUES(?,?,?)"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [eleve, matiere, valeur], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal ou les professeurs : permet de supprimer une note à un élève
    async supprimerNote(req){

        let id = req.params.id
        let requeteSQL = "DELETE FROM notes WHERE nt_id = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    //Fonction pour le principal ou les professeurs : permet de modifier une note d'un élève
    async modifierNote(req){

        let id = req.params.id
        let valeur = req.body.valeur
        let requeteSQL = "UPDATE notes SET nt_resultat = ? WHERE nt_id = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [valeur, id], (err, lignes, champs) => {

                if(err){

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