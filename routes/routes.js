const express = require('express');
const mainCtrl = require('../controllers/ControlAccueil.js');
const directeurCtrl = require('../controllers/ControlConnexionDirecteur.js');
const profCtrl = require('../controllers/ControlConnexionProf.js');
const eleveCtrl = require('../controllers/ControlConnexionEleve.js');
const noteCtrl = require('../controllers/ControlNote.js');
const matiereCtrl = require('../controllers/ControlMatiere.js');
const classeCtrl = require('../controllers/ControlClasse.js');
const router = express.Router();

router.get('/', mainCtrl.affichageAccueil);

router.get('/connexionDirecteur', directeurCtrl.affichageConnexionDirecteur);
router.post('/connexionDirecteur', directeurCtrl.controleConnexion);

router.get('/connexionProf', profCtrl.affichageConnexionProf);
router.post('/connexionProf', profCtrl.controleConnexion);

router.get('/connexionEleve', eleveCtrl.affichageConnexionEleve);
router.post('/connexionEleve', eleveCtrl.controleConnexion);

router.get('/deconnexion', mainCtrl.deconnexion);

router.get('/suiviNotes', noteCtrl.afficherToutesLesNotes);
router.get('/addNotes', noteCtrl.afficherAjouterNotes);
router.post('/addNotes', noteCtrl.ajouterNote);
router.get('/modifierNotes/:nt_id', noteCtrl.affichageUneNote);
router.post('/modifierNotes/:nt_id', noteCtrl.modifierNote);

router.get('/addMatiere', matiereCtrl.afficherAjouterMatiere);
router.post('/addMatiere', matiereCtrl.ajouterMatiere);
router.get('/matieres', matiereCtrl.affichageMatiere);

router.get('/addProfesseur', profCtrl.afficherAjouterProfesseur);
router.post('/addProfesseur', profCtrl.ajouterProfesseur);
router.get('/professeurs', profCtrl.affichageProfesseurs);

router.get('/addEleve', eleveCtrl.afficherAjouterEleve);
router.post('/addEleve', eleveCtrl.ajouterEleve);
router.get('/eleves', eleveCtrl.affichageEleves);
router.get('/modifierEleves/:el_id', eleveCtrl.affichageUnEleve);
router.post('/modifierEleves/:el_id', eleveCtrl.modifierEleve);


router.get('/addClasse', classeCtrl.afficherAjouterClasse);
router.post('/addClasse', classeCtrl.ajouterClasse);
router.get('/classes', classeCtrl.affichageToutesClasses)
router.get('/modifierClasses/:cl_id', classeCtrl.affichageUneClasse);
router.post('/modifierClasses/:cl_id', classeCtrl.modifierClasse);


module.exports = router 