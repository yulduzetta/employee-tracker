const connection = require("./db/database");
const { interactWithUser } = require("./src/prompt-user");

connection.connect((err) => {
  if (err) throw err;
  interactWithUser();
});
afterConnection = () => {
  console.log("Quitting the app!");
  connection.end();
};
