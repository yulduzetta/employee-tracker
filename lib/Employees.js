const connection = require("../db/database");
const cTable = require("console.table");

class Employees {
  constructor() {}
  getAllEmployees() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
      SELECT employees.id,
        employees.first_name,
        employees.last_name,
        roles.title,
        departments.name department,
        roles.salary,
        CONCAT(m.first_name, ' ', m.last_name) manager
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees m ON m.id = employees.manager_id
      ORDER BY employees.id ASC;`,
        function (err, res) {
          if (err) throw err;
          const table = cTable.getTable("\n", res);
          console.log(table);
          resolve(res);
        }
      );
    });
  }
}

module.exports = Employees;
