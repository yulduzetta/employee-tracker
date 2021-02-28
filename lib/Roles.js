const connection = require("../db/database");
const cTable = require("console.table");

class Roles {
  constructor() {}
  getAllRoles() {
    return new Promise(function (resolve, reject) {
      connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res)
        console.log(table)
        resolve(res);
      });
    });
  }
}

module.exports = Roles;
