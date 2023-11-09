const express = require("express");
const app = express();
const movieLobby = require("./controller/lobby");
require("./db/mongodb");

// app.get("/", (req, res) => {
//   console.log("its working");
//   res.status(200).send({ message: "its working" });
// });

app.use(express.json());

app.use("/", movieLobby);

const PORT = 3000;

app.listen(3000, () => {
  console.log("app is started");
});
