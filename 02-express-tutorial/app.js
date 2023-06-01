const express = require("express");
const app = express();
const people = require("./routes/people");

//static assets
app.use(express.static("./methods-public"));
//Parse
app.use(express.urlencoded({ extended: false }));

// Parse json
app.use(express.json());

app.use("api/people", people);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
