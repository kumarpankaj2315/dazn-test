const mongoose = require("mongoose");

let path =
  "mongodb://localhost:27017/dazn-db?readPreference=primary&directConnection=true&ssl=false";

mongoose.connect(path).then(() => {
  console.log("database connected");
});
