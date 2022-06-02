// Importation du modèle Sauce
const Sauce = require('../models/Sauce');
// Importation de file system 
const fs = require('fs');


// Pour ajouter une sauce en POST
exports.createSauce = async (req, res, next) => {
  // On récupére les champs dans le corps de la requête
  try {
  const sauceObject = JSON.parse(req.body.sauce);

  // On crée ne nouvelle instance de Sauce
  const sauce = new Sauce({
    ...sauceObject,
    // résolution de l'URL de l'image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // On enregistre l'objet dans la BDD avec une promesse
   const saveSauce = await sauce.save({}); 
  res.status(201).json(saveSauce);
  
  } catch (error) {
    res.status(404).json({error: error});
  }
};

// Pour modifier une sauce en PUT avec la méthode updateOne
exports.modifySauce = async (req, res, next) => {
  try {
    // On vérifie si le fichier image existe ou non
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    // On utilise le paramètre id de la requête pour trouver la Sauce et la modifier avec le meme _id qu'avant, sans en générer un nouveau 
    const updateSauce = await Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      res.status(200).json(updateSauce);
  } catch (error) {
    res.status(404).json({error: error}); 
  }  
};

 // Pour supprimer une sauce avec DELETE seulement si sauce.userId == auteur de la requête
 exports.deleteSauce = async (req, res, next) => {
   // Pour trouver la sauce 
   try {
     const findOne = await Sauce.findOne({ _id: req.params.id })

      if (!findOne) {
        res.status(404).json({ error: new Error("Cette sauce n'existe pas !")});
      }
      // On met l'identifiant mis dans objet requête utilsé pour le comparer avec le userId de la sauce
      if (findOne.userId !== req.auth.userId) {
        res.status(400).json({ error: new Error('Requête non autorisée !')});
        return findOne;
      }
      
      // On récupère le nom de fichier
      
        const filename = findOne.imageUrl.split('/images/')[1];
      // On supprime le fichier puis  on effectue le callback qui le supprime de la BDD
      fs.unlink(`images/${filename}` ,async () => {
        try {
        const delSauce = await Sauce.deleteOne({ _id: req.params.id });
         res.status(200).json(delSauce)
      }
      catch (error) {
        res.status(404).json({error: error}); 
      }
      });    
   } catch (error) {
    res.status(500).json({error: error}); 
  }   
 };

// Pour récupérer une seule sauce avec la méthode findOne
exports.getOneSauce = async (req, res) => {
  try {
    const oneSauce = await Sauce.findOne({_id: req.params.id});
    res.status(200).json(oneSauce);
  } catch (error) {
    res.status(404).json({error: error});
  }
}

// Pour récupérer toutes les sauces avec la methode find
exports.getAllSauces = async (req, res) => {
  try{
    const allSauces = await Sauce.find({});
    res.status(200).json(allSauces);
  }catch (error) {
    res.status(401).json({ error: error});
    }
};