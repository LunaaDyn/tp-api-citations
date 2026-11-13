import express from "express";
import { fileURLToPath } from "node:url";

const app = express();
app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./views/", import.meta.url)));
app.use(express.json());

const citations = [
    { id: 1, texte: "Apprendre en pratiquant.", auteur: "Équipe du TP" },
    {
        id: 2,
        texte: "If you win, you need not have to explain...If you lose, you should not be there to explain!",
        auteur: "Adolf Hitler",
    },
];
// let prochainId = 3;      this line is redundant

app.get("/", (req, res) => {
    res.render("index", { citations });
});

app.get("/ping", (req, res) => {
    res.type("text/plain").send("Serveur de citations prêt.");
});

app.get("/citations", (req, res) => {
    try {
        return res.status(200).json(citations);
    } catch (err) {
        return res.status(500).json({ message: "Erreur Serveur Interne" });
    }
});

app.get("/citations/:id", (req, res) => {
    // TODO : convertir l’ID en nombre, chercher la citation et gérer son absence.
    try {
        const reqID = Number(req.params.id);
        const citation = citations.find((cit) => cit.id === reqID);
        if (citation) return res.status(200).json(citation);
        else return res.status(404).json({ message: "Citation Introuvable" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur Serveur Interne" });
    }
});

app.post("/citations", (req, res) => {
    // TODO : valider req.body, créer une citation et incrémenter prochainId.
    try {
        const { texte, auteur } = req.body;
        texte = texte.trim();
        auteur = texte.trim();
        if (
            !texte ||
            !auteur ||
            texte === "" ||
            auteur === "" ||
            typeof texte !== "string" ||
            typeof auteur !== "string"
        )
            return res.status(400).json({ message: "Mauvaise Requête" });

        const citation = {
            id: citations[citations.length - 1].id + 1,
            texte: texte,
            auteur: auteur,
        };

        citations.push(citation);

        return res.status(201).json(citation);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Erreur Serveur Interne" });
    }
});

app.put("/citations/:id", (req, res) => {
    // TODO : retrouver la citation et remplacer texte et auteur après validation.
    try {
        const reqID = Number(req.params.id);
        const { texte, auteur } = req.body;
        texte = texte.trim();
        auteur = texte.trim();
        if (
            !texte ||
            !auteur ||
            texte === "" ||
            auteur === "" ||
            typeof texte !== "string" ||
            typeof auteur !== "string"
        )
            return res.status(400).json({ message: "Mauvaise Requête" });

        const citationIndex = citations.findIndex((cit) => cit.id == reqID);

        if ((!citationIndex && citationIndex !== 0) || citationIndex < 0)
            return res.status(404).json({ message: "Citation Introuvable" });

        const newCitation = {
            id: citations[citationIndex].id,
            texte: texte,
            auteur: auteur,
        };

        citations[citationIndex] = newCitation;

        return res.status(200).json(newCitation);
    } catch (err) {
        return res.status(500).json({ message: "Erreur Serveur Interne" });
    }
});

app.delete("/citations/:id", (req, res) => {
    // TODO : retirer la citation du tableau et terminer la réponse.
    try {
        const reqID = Number(req.params.id);

        const citationIndex = citations.findIndex((cit) => cit.id == reqID);

        if ((!citationIndex && citationIndex !== 0) || citationIndex < 0)
            return res.status(404).json({ message: "Citation Introuvable" });

        citations.splice(citationIndex, 1);

        return res.status(204).send(); // My Postman struggles if it doesn't receive any kind of response
    } catch (err) {
        return res.status(500).json({ message: "Erreur Serveur Interne" });
    }
});

app.listen(3000, () => {
    console.log("API disponible sur http://localhost:3000");
});
