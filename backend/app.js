// Importation d'express
const express = require('express');
// Importation de mongoose
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://JeremyC:Gototheparadise6@cluster0.vky2v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Appel de la méthode express
const app = express();



module.exports = app;