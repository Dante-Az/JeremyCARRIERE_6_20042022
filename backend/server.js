 // Importation du package HTTP natif de Node
 const http = require('http');
 // Importation de l'application
 const app = require('./app');
 // Renvoi d'un port valide
 const normalizePort = val => {
   const port = parseInt(val, 10);
 
   if (isNaN(port)) {
     return val;
   }
   if (port >= 0) {
     return port;
   }
   return false;
 };
 // On indique à l'application express sur quel port elle doit tourner
 const port = normalizePort(process.env.PORT || '3000');
 app.set('port', port);
 // gestion des erreurs de port
 const errorHandler = error => {
   if (error.syscall !== 'listen') {
     throw error;
   }
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges.');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use.');
       process.exit(1);
       break;
     default:
       throw error;
   }
 };
 // Création du serveur avec la méthode createServer qui reçoit la fonction app
 const server = http.createServer(app);
 // Appel de la fonction de gestion d'erreur
 server.on('error', errorHandler);
 // Ecoute du port d'exécution du serveur
 server.on('listening', () => {
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
   console.log('Listening on ' + bind);
 });
 // Ecoute des requêtes envoyés par le port disponible
 server.listen(port);
 