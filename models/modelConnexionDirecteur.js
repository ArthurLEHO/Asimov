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

const ConnexionDirecteur = {

    async connexion() {

        return new Promise((resolve, reject) => {

            let requeteSQL = "SELECT * FROM personnelscolaires WHERE ps_statut = 'Principal'"

            mysqlconnexion.query(requeteSQL, (err, lignes) => {

                if (err) {

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    ConnexionDirecteur
}