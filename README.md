# TP 1 · Répondre à une requête HTTP avec Express

Tu vas compléter deux réponses du serveur de citations. À la fin du TP, `/citations` doit renvoyer la liste au format JSON et une adresse inconnue doit renvoyer une erreur `404`.

## 1. Démarrer le projet

Place-toi dans le dossier du dépôt. Avec Node.js 22 ou plus récent, lance ces commandes dans le terminal.

```bash
npm install
npm start
```

Ouvre [http://localhost:3000/](http://localhost:3000/) dans ton navigateur. Tu dois voir la page **Citations** et la citation de départ. Garde le serveur ouvert et utilise un deuxième terminal pour lancer les commandes `curl`.

| Adresse | Réponse au départ |
|---|---|
| `/` | Une page HTML générée avec EJS |
| `/ping` | Le message texte « Serveur de citations prêt. » |
| `/citations` et `/inconnue` | Le statut provisoire `501` et le message « À compléter » |

## 2. Comprendre le code fourni

Dans `app.get("/ping", (req, res) => { … })`, Express exécute la fonction quand il reçoit un `GET /ping`. `req` représente la requête envoyée par le client. `res` sert à construire la réponse.

- `res.send()` envoie ici un message texte. La route `/ping` précise ce format avec `res.type("text/plain")`.
- `res.json()` transforme un tableau ou un objet JavaScript en JSON et indique ce format dans la réponse.
- `res.render("index", { citations })` transmet le tableau à `views/index.ejs`. La boucle du fichier EJS affiche chaque citation dans la page HTML.

L’en-tête `Content-Type` indique le format du contenu reçu. Avec `curl -i`, tu verras le statut HTTP, les en-têtes et le contenu de la réponse.

## 3. Compléter les deux TODO dans server.js

1. **Lister les citations.** Dans `GET /citations`, remplace la réponse provisoire par une réponse JSON qui contient le tableau `citations` déjà déclaré dans le fichier. Vérifie que la route renvoie `200`.
2. **Répondre à une adresse inconnue.** Dans le dernier `app.use()`, remplace la réponse provisoire par un statut `404` et le JSON `{"message":"Route introuvable"}`. Express arrive à ce bloc quand aucune route précédente n’a répondu.

Si tu as lancé le serveur avec `npm start`, arrête-le avec **Ctrl+C** puis relance-le après avoir enregistré tes modifications. Tu peux aussi utiliser `npm run dev` pour le redémarrage automatique.

## 4. Tester et préparer le rendu

```bash
curl -i http://localhost:3000/ping
curl -i http://localhost:3000/citations
curl -i http://localhost:3000/inconnue
```

| Requête | Résultat attendu après l’exercice |
|---|---|
| `GET /ping` | `200` et un message en texte brut |
| `GET /citations` | `200` et le tableau de citations en JSON |
| `GET /inconnue` | `404` et le message « Route introuvable » en JSON |

Dans `RENDU.md`, note le statut et le contenu des réponses pour `/citations` et `/inconnue`. Explique à quoi servent `req` et `res`. Relève la ligne `Content-Type` des réponses de `/ping` et de `/citations`, puis indique le format renvoyé par chaque route.

[Consignes Git et remise du TP](PARCOURS.md)
