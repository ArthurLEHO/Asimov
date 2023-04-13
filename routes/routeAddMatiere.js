const express =  require('express');
const mainCtrl = require('../controllers/ControlAddMatiere.js');
const router = express.Router() ;

router.get('/connexion', mainCtrl.affichageMenu);
router.get('/addMatiere', mainCtrl.affichageAddMatiere);


module.exports = router 