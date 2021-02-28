const connection = require("../db/database");
const cTable = require("console.table");

class Departments {
  constructor() {}
  getAllDepartmentsNames() {
    return new Promise(function (resolve, reject) {
      connection.query(`SELECT name AS department_name FROM departments`, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable("\n", res);
        console.log(table);
        resolve(res);
      });
    });
  }
}

module.exports = Departments;
