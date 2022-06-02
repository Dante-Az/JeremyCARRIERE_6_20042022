// Importation d'express
const express = require('express');
// Création d'un router 
const router = express.Router();

// Importation du middleware d'authentification
const auth = require('../middleware/auth');
// Importation de multer
const multer = require('../middleware/multer-config');


// Importation du controller des sauces
const sauceCtrl = require('../controllers/sauce');
// Importation du controller des likes/dislikes
const likeCtrl = require('../controllers/likes');
const idCheck = require('../middleware/idCheck');


// On enregistre les routes dans le router et  on applique des fonctions du controller 
// auth applique authentification à toutes les routes (à placer en 1er)
// multer applique l'ajout de fichier aux routes post et put
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, idCheck, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, idCheck, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, likeCtrl.likeSauce);

// export du router
module.exports = router;