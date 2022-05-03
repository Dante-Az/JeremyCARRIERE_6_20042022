// Importation d'express
const express = require('express');
// On crée le router
const router = express.Router();
// Importation du controller du user
const userCtrl = require('../controllers/user');


// Routes pour user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;