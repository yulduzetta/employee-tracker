const connection = require("../db/database");

class Departments {
  constructor() {}
  getAllDepartmentsNames() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `SELECT id, name AS department_name FROM departments`,
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  addNewDepartment(departmentName) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
      INSERT INTO departments (name)
        VALUES (?); 
        `,
        [departmentName],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  deleteDepartment(departmentName) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `DELETE FROM departments WHERE name = ?`,
        [departmentName],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  getDepartmentIdByName(departmentName) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `SELECT id FROM departments WHERE name = ?`,
        [departmentName],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }
  getDepartmentBudget(departmentName) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT SUM(salary) total_budget, departments.name department
        FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.department_id = departments.id
        WHERE departments.name = ?`,
        [departmentName],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }
}

module.exports = Departments;
