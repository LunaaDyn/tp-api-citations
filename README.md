# 02 · Un CRUD avec Express

[Parcours et rendu](PARCOURS.md) · Lance `npm install` puis `npm start`.

## Voir le résultat dans le navigateur

Ouvre [la page EJS](http://localhost:3000/) après avoir démarré le serveur. Rafraîchis-la après une requête d’ajout, de modification ou de suppression pour voir la liste à jour. Les requêtes CRUD se font avec curl, Postman ou Bruno. La route `/ping` renvoie du texte avec `res.send()`, et les routes de l’API utilisent `res.json()` pour les réponses JSON.

## Mini-cours · Construire un CRUD en mémoire

CRUD désigne les quatre actions sur les données. Dans ce TP, le tableau de citations est conservé en mémoire pendant que le serveur tourne. Un redémarrage recharge le tableau de départ.

| Action    | Requête               | Où lire les données envoyées                                      |
| --------- | --------------------- | ----------------------------------------------------------------- |
| Créer     | `POST /citations`     | `req.body` contient le texte et l’auteur                          |
| Lire      | `GET /citations/1`    | `req.params.id` vaut `"1"`                                        |
| Modifier  | `PUT /citations/1`    | L’ID est dans `req.params` et les nouveaux champs dans `req.body` |
| Supprimer | `DELETE /citations/1` | L’ID est dans `req.params`                                        |

### Retrouver une citation

`req.params.id` est une chaîne. Convertis-la avec `Number()` pour la comparer aux identifiants numériques du tableau. `find()` renvoie le premier objet correspondant ou `undefined`. `findIndex()` renvoie sa position ou `-1`. Vérifie que tu as trouvé la citation avant de lire ses propriétés, de la modifier ou d’utiliser `splice()`.

```js
const id = Number(req.params.id);
const citation = citations.find((element) => element.id === id);
```

### Vérifier les données et répondre

`express.json()` lit le corps des requêtes envoyées avec `Content-Type: application/json`. Pour POST et PUT, vérifie d’abord le type des champs avec `typeof`, puis retire les espaces au début et à la fin avec `trim()`. Un champ composé uniquement d’espaces devient vide. Quand tu crées une citation, attribue-lui la valeur de `prochainId`, puis incrémente le compteur.

Utilise `400` pour une entrée invalide, `404` pour une citation introuvable et `201` après une création. Après une suppression réussie, utilise `res.status(204).end()` pour envoyer une réponse sans corps. Quand tu envoies une réponse d’erreur dans un `if`, utilise `return` pour arrêter la fonction à cet endroit.

## À toi de jouer

`GET /citations` fonctionne déjà. Complète les quatre autres routes dans cet ordre.

| Requête                 | Réponse attendue                               |
| ----------------------- | ---------------------------------------------- |
| `GET /citations/:id`    | 200 et la citation, ou 404 si elle est absente |
| `POST /citations`       | 201 et la citation avec un nouvel identifiant  |
| `PUT /citations/:id`    | 200 et la citation mise à jour, ou 404         |
| `DELETE /citations/:id` | 204 avec un corps vide, ou 404                 |

Pour POST et PUT, vérifie que `texte` et `auteur` sont des chaînes non vides après `trim()`. Sinon, renvoie 400 et un message JSON. Pour PUT, garde le même identifiant. Utilise `prochainId` pour que les identifiants supprimés ne soient pas réutilisés pendant l’exécution.

```bash
curl -i http://localhost:3000/citations/1
curl -i -X POST http://localhost:3000/citations -H 'Content-Type: application/json' -d '{"texte":"On progresse en essayant.","auteur":"Ada"}'
curl -i -X POST http://localhost:3000/citations -H 'Content-Type: application/json' -d '{"texte":" ","auteur":"Ada"}'
curl -i -X PUT http://localhost:3000/citations/1 -H 'Content-Type: application/json' -d '{"texte":"Nouvelle version","auteur":"Ada"}'
curl -i -X DELETE http://localhost:3000/citations/1
curl -i http://localhost:3000/citations/1
```

Dans `RENDU.md`, relève le POST invalide et le GET après suppression. Explique d’où viennent les valeurs de `req.params.id` et `req.body`.
