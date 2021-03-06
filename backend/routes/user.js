// Importation d'express
const express = require('express');
// On crée le router
const router = express.Router();
// Importation du controller du user
const userCtrl = require('../controllers/user');
// Validation du mot de passe
const password = require('../middleware/password');
// Validation du mail
const email = require('../middleware/email')

// Routes pour user
router.post('/signup', password, email, userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;