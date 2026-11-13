# Rendu

- Citations retourne le status 200 (OK), et retourne l'entièreté du tableau "citations" en json
- Inconnue retoure le status 404 (Not Found), et retourne un objet js avec en message "Chemin introuvable"

- req signifie "Request/Requête" et permet d'avoir des infos de la requête (body, params, headers, ip etc.)
- res signifie "Response/Réponse" et permet de faire des trucs en rapport avec la réponse que recevra la personne qui a envoyé la requête

- Le Content-Type de ping est text/plain
- - Le Content-Type de citations est application/json
