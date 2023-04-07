const express =  require('express');
const mainCtrl = require('../controllers/ControlAccueil.js');
const router = express.Router() ;

router.get('/', mainCtrl.affichageAccueil);
router.get('/connexion', mainCtrl.affichageConnexion);

module.exports = router 