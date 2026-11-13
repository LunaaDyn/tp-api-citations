# Une matinée pour construire une API de citations

Prévoir environ quatre heures, avec une pause et du temps pour les problèmes de connexion.

| Branche | Durée indicative | Objectif |
|---|---:|---|
| `01-node-http` | 45 min | Découvrir les réponses HTTP avec Express et EJS |
| `02-express-crud` | 75 min | Construire un CRUD en mémoire |
| `03-mongodb-mongoose` | 90 min | Connecter Atlas et persister les citations |
| Rendu | 15 min | Vérifier les trois branches sur GitHub |

## Démarrer et rendre le TP

1. Fais un fork sur GitHub. Si l’option « Copy the default branch only » apparaît, décoche-la pour récupérer les trois branches.
2. Clone ton fork et ouvre-le dans ton éditeur. Vérifie que `git branch -r` affiche les trois branches et que `node -v` indique Node.js 22 ou plus récent.
3. Commence par `git switch 01-node-http`. Lis le README de la branche et complète les TODO.
4. Dans chaque branche, ajoute dans `RENDU.md` deux vérifications effectuées (méthode, URL, statut et résultat), puis réponds à la question du README avec tes mots. Arrête le serveur avec Ctrl+C avant de changer de branche.
5. Sur chaque branche, vérifie `git status`, puis fais `git add .`, un commit avec un message explicite et `git push -u origin HEAD`. Passe ensuite à la branche suivante avec `git switch 02-express-crud`, puis `git switch 03-mongodb-mongoose`. Chaque branche fournit son point de départ et se complète indépendamment.
6. Vérifie les trois branches et leurs commits dans ton fork sur GitHub. Remets un seul lien, celui du dépôt, accessible à l’enseignant.

Tu peux utiliser curl, Postman ou Bruno pour envoyer les requêtes. Les exemples curl ciblent un terminal Bash ou Zsh. Sur Windows, tu peux les lancer dans Git Bash ou reproduire les requêtes dans Postman.

Source du parcours HTTP, Express et CRUD MongoDB : [OpenClassrooms](https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466231-demarrez-votre-serveur-node).
