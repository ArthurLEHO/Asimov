const mysql = require('mysql')
const iniparser = require('iniparser')
let configDB = iniparser.parseSync('./DB.ini')

let mysqlconnexion = mysql.createConnection({

    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']

});

mysqlconnexion.connect((err) => {

    if (err) console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))

})

const addMatiere = {

    async connexion(){

        return new Promise((resolve, reject) => {

            let requeteSQL = "SELECT * FROM eleves, personnelscolaires"

            mysqlconnexion.query(requeteSQL, (err, lignes) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {
    addMatiere
}