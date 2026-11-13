import express from "express";
import { fileURLToPath } from "node:url";

const app = express();
app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./views/", import.meta.url)));
app.use(express.json());

const citations = [
    { id: 1, texte: "Apprendre en pratiquant.", auteur: "Équipe du TP" },
];
// let prochainId = 2;      this line is redundant

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
        return res.status(501).json({ message: "Erreur Serveur Interne" });
    }
});

app.get("/citations/:id", (req, res) => {
    // TODO : convertir l’ID en nombre, chercher la citation et gérer son absence.
    try {
        const reqID = Number(req.params.id);
        const citation = citations.find(({ id }) => id === reqID);
        if (citation) return res.status(200).json(citation);
        else return res.status(404).json({ message: "Citation Introuvable" });
    } catch (err) {
        console.error(err);
        return res.status(501).json({ message: "Erreur Serveur Interne" });
    }
});

app.post("/citations", (req, res) => {
    // TODO : valider req.body, créer une citation et incrémenter prochainId.
    try {
        const { texte, auteur } = req.body;
        if (
            !texte ||
            !auteur ||
            texte === "" ||
            auteur === "" ||
            typeof texte !== "string" ||
            typeof auteur !== "string"
        )
            return res.status(400).json({ message: "Mauvaise Requête" });

        return res.status(201).json(citations);
    } catch (err) {
        return res.status(501).json({ message: "Erreur Serveur Interne" });
    }
});

app.put("/citations/:id", (req, res) => {
    // TODO : retrouver la citation et remplacer texte et auteur après validation.
    try {
        return res.status(200).json(citations);
    } catch (err) {
        return res.status(501).json({ message: "Erreur Serveur Interne" });
    }
});

app.delete("/citations/:id", (req, res) => {
    // TODO : retirer la citation du tableau et terminer la réponse.
    try {
        return res.status(200).json(citations);
    } catch (err) {
        return res.status(501).json({ message: "Erreur Serveur Interne" });
    }
});

app.listen(3000, () => {
    console.log("API disponible sur http://localhost:3000");
});
