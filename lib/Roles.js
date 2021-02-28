const connection = require("../db/database");
const cTable = require("console.table");

class Roles {
  constructor() {}
  getAllRoles() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
    SELECT roles.id, roles.title, roles.salary, departments.name
    FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.id 
    ORDER BY  roles.id ASC
      `,
        function (err, res) {
          if (err) throw err;
          const table = cTable.getTable(res);
          console.log(table);
          resolve(res);
        }
      );
    });
  }
}

module.exports = Roles;
