const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

function carregarLista() {
  const arquivo = path.join(__dirname, "the100.txt");

  if (!fs.existsSync(arquivo)) {
    console.error("Arquivo the100.txt não encontrado.");
    return [];
  }

  return fs
    .readFileSync(arquivo, "utf8")
    .split(/\r?\n/)
    .map(linha => linha.trim())
    .filter(linha => linha && !linha.startsWith("#"));
}

function sortearThe100() {
  const lista = carregarLista();

  if (!lista.length) {
    return "A lista de The 100 está vazia ou o arquivo the100.txt não foi encontrado.";
  }

  const linha = lista[Math.floor(Math.random() * lista.length)];
  const partes = linha.split("|");

  const nome = (partes[0] || "").trim();
  const descricao = partes.slice(1).join("|").trim();

  if (!nome) {
    return "Erro: personagem sem nome na lista.";
  }

  if (descricao) {
    return `Seu personagem de The 100 é: ${nome} — ${descricao}`;
  }

  return `Seu personagem de The 100 é: ${nome}`;
}

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.type("text/plain").send(sortearThe100());
});

app.get("/the100", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.type("text/plain").send(sortearThe100());
});

app.get("/100", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.type("text/plain").send(sortearThe100());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor The 100 online na porta ${PORT}`);
});
