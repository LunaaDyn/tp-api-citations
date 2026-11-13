import express from "express";
import { fileURLToPath } from "node:url";

const app = express();
app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./views/", import.meta.url)));

const citations = [
  { id: 1, texte: "Apprendre en pratiquant.", auteur: "Équipe du TP" },
];

app.get("/", (req, res) => {
  res.render("index", { citations });
});

app.get("/ping", (req, res) => {
  res.type("text/plain").send("Serveur de citations prêt.");
});

app.get("/citations", (req, res) => {
  // TODO : renvoyer le tableau de citations avec res.json().
  res.status(501).json({ message: "À compléter" });
});

app.use((req, res) => {
  // TODO : renvoyer un statut 404 et le message « Route introuvable » en JSON.
  res.status(501).json({ message: "À compléter" });
});

app.listen(3000, () => {
  console.log("Serveur disponible sur http://localhost:3000");
});
