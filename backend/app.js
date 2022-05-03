// Installation de dotenv
require('dotenv').config();
//console.log(process.env);
// Importation d'express
const express = require('express');
// Importation de mongoose
const mongoose = require('mongoose');

// Importation du router "user"
const userRoutes = require('./routes/user');

// Connexion à MongoDB
mongoose.connect(`mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@cluster0.vky2v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Appel de la méthode express
const app = express();

// Prévention des erreurs CORS
app.use((req, res, next) => {
  // Pour accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  // Pour ajouter les headers aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Pour envoyer des requêtes avec les méthodes suivantes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware permettant de récupérer le body des requêtes
app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;