const connection = require("../db/database");
const cTable = require("console.table");

class Employees {
  constructor() {}
  getAllEmployees() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT 
        ROW_NUMBER() OVER (
          ORDER BY employees.id
        ) row_num,
            employees.id employee_id,
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
            ORDER BY employees.id ASC`,
        function (err, res) {
          if (err) throw err;
          const table = cTable.getTable("\n", res);
          console.log(table);
          resolve(res);
        }
      );
    });
  }

  getEmployee(id) {
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
      WHERE employees.id = ?`,
        [id],
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
        WHERE CONCAT(employees.first_name,' ',employees.last_name) = ?
      `,
        [managerName],
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
        VALUES (?, ?, ?, ?); 
        `,
        [firstName, lastName, roleId, managerId],
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

  getEmployeeFullNames() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT CONCAT(employees.first_name,' ',employees.last_name) full_name
        FROM employees
      `,
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }
  getEmployeeIdByName(employeeName) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT id
        FROM employees
        WHERE CONCAT(employees.first_name,' ',employees.last_name) = ?
      `,
        [employeeName],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }
  deleteEmployee(employeeId) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `DELETE FROM employees WHERE id = ?`,
        [employeeId],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  updateEmployeeRole(employeeId, roleId) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `UPDATE employees SET role_id = ? WHERE id = ?`,
        [roleId, employeeId],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  updateEmployeeManager(employeeId, managerId) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `UPDATE employees SET manager_id = ? WHERE id = ?`,
        [managerId, employeeId],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }
}

module.exports = Employees;
