// Installation de dotenv
require('dotenv').config();
//console.log(process.env);
// Importation d'express
const express = require('express');
// Importation de mongoose
const mongoose = require('mongoose');
//installation Helmet
const helmet = require('helmet');
// Importation de path pour accéder au path du serveur
const path = require('path');
// Pour limiter les requêtes
const rateLimit = require('express-rate-limit');

// Importation du router "user"
const userRoutes = require('./routes/user');
// Importation du router "sauce"
const sauceRoutes = require('./routes/sauce')

// Connexion à MongoDB
mongoose.connect(`mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@cluster0.vky2v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // Limite chaque IP à 100 requêtes par "fenêtre" de 15min
  standardHeaders: true, // Retourne l'info de limite dans les headers
  legacyHeaders: false // Désactive le 'X-rateLimit-*' headers
});

//Appel de la méthode express
const app = express();
app.use(limiter);
app.use(helmet());

// Prévention des erreurs CORS
app.use((req, res, next) => {
  // Pour accéder à l'API depuis n'importe quelle origine
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  // Pour ajouter les headers aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Pour envoyer des requêtes avec les méthodes suivantes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  next();
});

// Middleware permettant de récupérer le body des requêtes
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
// On utilise la méthode app.use() pour attribuer un middleware à une route spécifique
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;