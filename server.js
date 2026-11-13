import express from "express";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
const citationSchema = new mongoose.Schema({
    // TODO : déclarer texte et auteur comme chaînes requises et nettoyées.
});
const Citation = mongoose.model("Citation", citationSchema);

const app = express();
app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./views/", import.meta.url)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const citations = await Citation.find();
    res.render("index", { citations, erreur: null });
});

app.post("/ajouter-citation", async (req, res) => {
    const texte = req.body?.texte;
    const auteur = req.body?.auteur;

    if (
        typeof texte !== "string" ||
        typeof auteur !== "string" ||
        !texte.trim() ||
        !auteur.trim()
    ) {
        const citations = await Citation.find();
        return res.status(400).render("index", {
            citations,
            erreur: "Renseigne la citation et son auteur.",
        });
    }

    await Citation.create({ texte: texte.trim(), auteur: auteur.trim() });
    res.redirect(303, "/");
});

app.get("/ping", (req, res) => {
    res.type("text/plain").send("Serveur de citations prêt.");
});

app.get("/citations", async (req, res) => {
    const citations = await Citation.find();
    res.json(citations);
});

app.get("/citations/:id", async (req, res) => {
    // TODO : convertir l’ID en nombre, chercher la citation et gérer son absence.

    const reqID = Number(req.params.id);
    const citation = await Citation.find();
    if (citation) return res.status(200).json(citation);
    else return res.status(404).json({ message: "Citation Introuvable" });
});

app.post("/citations", async (req, res) => {
    // TODO : valider req.body, créer une citation et incrémenter prochainId.

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
});

app.put("/citations/:id", async (req, res) => {
    // TODO : retrouver la citation et remplacer texte et auteur après validation.

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
});

app.delete("/citations/:id", async (req, res) => {
    // TODO : retirer la citation du tableau et terminer la réponse.
    const reqID = Number(req.params.id);

    const citationIndex = citations.findIndex((cit) => cit.id == reqID);

    if ((!citationIndex && citationIndex !== 0) || citationIndex < 0)
        return res.status(404).json({ message: "Citation Introuvable" });

    citations.splice(citationIndex, 1);

    return res.status(204).send(); // My Postman struggles if it doesn't receive any kind of response
});

app.use((err, req, res, next) => {
    if (err.status === 400 || err.name === "ValidationError") {
        return res.status(400).json({ message: "Données invalides" });
    }

    console.error(err.message);
    res.status(500).json({ message: "Erreur serveur" });
});

async function demarrer() {
    // TODO : attendre mongoose.connect avec MONGODB_URI et dbName « tp_citations ».
    MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
        db.close();
    });
    app.listen(3000, () => {
        console.log("API disponible sur http://localhost:3000");
    });
}

demarrer().catch(() => {
    console.error(
        "Connexion Atlas impossible. Vérifie .env et la configuration Atlas.",
    );
    process.exitCode = 1;
});
