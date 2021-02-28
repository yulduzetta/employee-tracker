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

  getAllEmployeesByDepartment() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
      SELECT 
        employees.first_name,
        employees.last_name,
        departments.name department
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments ON roles.department_id = departments.id  
    `,
        function (err, res) {
          if (err) throw err;
          const table = cTable.getTable("\n", res);
          console.log(table);
          resolve(res);
        }
      );
    });
  }

  getAllEmployeesByManager() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
      SELECT
        employees.first_name,
        employees.last_name,
        CONCAT(m.first_name, ' ', m.last_name) manager_name
      FROM employees
      LEFT JOIN employees m ON m.id = employees.manager_id
      ORDER BY manager_name desc ; 
    `,
        function (err, res) {
          if (err) throw err;
          const table = cTable.getTable("\n", res);
          console.log(table);
          resolve(res);
        }
      );
    });
  }

  getManagers() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT CONCAT(employees.first_name, ' ', employees.last_name) manager_name
        FROM employees
        WHERE employees.manager_id IS NULL
      `,
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  getManagerIdByName(managerName) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT id
        FROM employees
        WHERE CONCAT(employees.first_name,' ',employees.last_name) = '${managerName}'
      `,
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  addNewEmployee(firstName, lastName, roleId, managerId) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
      INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId}); 
        `,
        function (err, res) {
          if (err) throw err;
          console.log(
            `\n ${firstName} ${lastName} has been successgfully added to the database \n`
          );
          resolve(res);
        }
      );
    });
  }
}

module.exports = Employees;