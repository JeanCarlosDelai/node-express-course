const express = require("express");
const router = express.Router();

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Bem vindo ${name}`);
  }
  res.status(401).send("Por favor forneça as credenciais");
});

module.exports = router;
