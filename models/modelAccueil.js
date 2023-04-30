// Importer le module MySQL
const mysql = require('mysql')

// Importer le module iniparser pour lire les fichiers INI
const iniparser = require('iniparser')

// Charger la configuration de la base de données depuis le fichier DB.ini
let configDB = iniparser.parseSync('./DB.ini')

// Créer une connexion à la base de données MySQL avec les paramètres de configuration
let mysqlconnexion = mysql.createConnection({

    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']

});

// Établir la connexion à la base de données
mysqlconnexion.connect((err) => {

    if (err) console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))

})

// Définir un objet Accueil qui contient une méthode connexion qui renvoie une promesse
const Accueil = {

    async connexion(){

        return new Promise((resolve, reject) => {

            // Requête SQL pour récupérer les données des tables "eleves" et "personnelscolaires"
            let requeteSQL = "SELECT * FROM eleves, personnelscolaires"

            // Envoyer la requête à la base de données avec la connexion MySQL
            mysqlconnexion.query(requeteSQL, (err, lignes) => {

                if(err){
                    // Si une erreur se produit, rejeter la promesse avec l'erreur
                    return reject(err)

                }

                // Si la requête réussit, résoudre la promesse avec les données renvoyées par la base de données
                return resolve(lignes)

            })
        })
    }
}

// Exporter l'objet Accueil pour pouvoir l'utiliser dans d'autres fichiers JavaScript
module.exports = {
    
    Accueil
}
