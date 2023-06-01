const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "john") {
    req.user = { name: "john", id: 3 };
    next();
  } else {
    res.status(401).send("Usuário não autorizado");
  }
  console.log("Autorizado");
  next();
};

module.exports = authorize;
