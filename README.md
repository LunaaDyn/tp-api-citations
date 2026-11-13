# 03 · Enregistrer les citations dans MongoDB Atlas

[Parcours et rendu](PARCOURS.md) · Lance `npm install`.

## Prépare Atlas

1. Ouvre ton projet Atlas et sélectionne ton cluster. Crée un utilisateur de base de données avec des droits de lecture et d’écriture pour le TP.
2. Dans les paramètres d’accès réseau, ajoute l’adresse IP publique actuelle depuis laquelle tu travailles.
3. Ouvre **Connect → Drivers** pour ton cluster et copie l’URI Node.js. Copie `.env.example` vers `.env` et complète `MONGODB_URI` en remplaçant les valeurs de l’utilisateur de base de données. Si le mot de passe contient des caractères réservés, encode-les dans l’URI.
4. Vérifie que `git check-ignore .env` affiche `.env`. Garde le fichier `.env.example` vide de tout identifiant de connexion.

[Documentation de connexion MongoDB Atlas](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/)

## Voir le résultat dans le navigateur

Après avoir complété le schéma et la connexion Atlas, lance `npm start` et ouvre [la page EJS](http://localhost:3000/). Express lit les citations avec `Citation.find()` puis passe la liste à EJS avec `res.render()`. Le navigateur reçoit directement la page HTML.

Ajoute une citation avec le formulaire. Le navigateur envoie un POST à `/ajouter-citation` et `express.urlencoded()` rend les champs disponibles dans `req.body`. Après l’enregistrement dans MongoDB, Express redirige le navigateur vers `/` pour afficher la liste à jour. L’affichage et l’ajout fonctionnent sans `fetch()`.

Pour les exercices de l’API JSON ci-dessous, utilise curl, Postman ou Bruno. Tu peux aussi redémarrer le serveur puis rouvrir la page EJS pour vérifier que la citation ajoutée avec le formulaire a bien été conservée.

## Mini-cours · Du tableau JavaScript à MongoDB

Une **collection** regroupe des documents. Chaque citation est un document avec un `_id` attribué par MongoDB. Le **schéma** Mongoose décrit les champs et leurs règles. Le **modèle** permet de lire et d’écrire dans la collection. Par exemple, cette déclaration décrit une chaîne obligatoire dont les espaces en début et en fin sont retirés.

```js
titre: { type: String, required: true, trim: true }
```

Dans le TP, applique cette structure aux champs `texte` et `auteur`. La validation des entrées HTTP permet aussi de vérifier que les valeurs reçues sont bien des chaînes avant de les transmettre à Mongoose.

### Attendre la base de données

`mongoose.connect()` renvoie une promesse. Dans `demarrer()`, place `await mongoose.connect(...)` avant `app.listen()`. Le serveur commence ainsi à accepter les requêtes une fois la connexion établie. L’URI vient de `process.env.MONGODB_URI` et l’option `dbName` choisit la base.

| Opération | Méthode Mongoose | Résultat attendu |
|---|---|---|
| Lister | `await Citation.find()` | Un tableau de documents, éventuellement vide |
| Créer | `await Citation.create({ texte, auteur })` | Le document enregistré avec son `_id` |
| Chercher par ID | `await Citation.findById(id)` | Le document trouvé ou `null` |

Avant `findById()`, utilise `mongoose.isObjectIdOrHexString(id)` pour vérifier le format. Un format invalide donne `400`. Si le format est valide mais que la recherche renvoie `null`, réponds `404`.

### Suivre le trajet du formulaire EJS

Le navigateur demande `/`. Express lit la collection et EJS transforme les citations en HTML. Quand tu envoies le formulaire, les champs arrivent dans `req.body` grâce à `express.urlencoded()`. Une fois la citation enregistrée, la redirection `303` demande au navigateur de refaire un `GET /`. La page est alors reconstruite à partir de la liste mise à jour. Pour un POST JSON, c’est `express.json()` qui lit le corps de la requête.

## À toi de jouer

1. Déclare les champs `texte` et `auteur` dans le schéma Mongoose de `server.js` avec `String`, `required` et `trim`.
2. Complète la connexion avant le démarrage du serveur avec `process.env.MONGODB_URI` et l’option `dbName` réglée sur `tp_citations`. Lance `npm start` et vérifie que `GET /citations` renvoie un tableau.
3. Ajoute le POST avec `Citation.create`. Enregistre uniquement `texte` et `auteur`. Vérifie comme à la branche précédente que ce sont des chaînes non vides. Réponds 201 avec le document créé, ou 400 si les données sont invalides.
4. Ajoute `GET /citations/:id` avec `Citation.findById`. Utilise `mongoose.isObjectIdOrHexString` pour renvoyer 400 quand l’identifiant est mal formé et 404 quand il est valide mais absent.
5. Bonus si tu as le temps. Ajoute PUT et DELETE. Pour PUT, valide les deux champs, applique les validateurs Mongoose à la mise à jour et renvoie le document modifié. Pour DELETE, renvoie 204 sans corps. Les deux routes reprennent les règles 400 et 404 du GET par identifiant.

```bash
curl -i -X POST http://localhost:3000/citations -H 'Content-Type: application/json' -d '{"texte":"Je reste après le redémarrage.","auteur":"Ada"}'
curl -i http://localhost:3000/citations
curl -i http://localhost:3000/citations/invalide
curl -i http://localhost:3000/citations/000000000000000000000000
```

Copie le `_id` du POST, arrête le serveur, relance `npm start`, puis retrouve la citation sur `/citations/<id>`. Dans `RENDU.md`, indique le résultat du POST et du GET après redémarrage. Explique pourquoi la citation survit au redémarrage et comment tu distingues un identifiant invalide d’une citation absente.
