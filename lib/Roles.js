const connection = require("../db/database");

class Roles {
  constructor() {}
  getRolesVerbose() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT roles.id, roles.title, roles.salary, departments.name AS department_name
        FROM roles
        INNER JOIN departments
        ON roles.department_id = departments.id 
        ORDER BY id
      `,
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  getRoles() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT roles.title
        FROM roles
        INNER JOIN departments
        ON roles.department_id = departments.id 
      `,
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  getRoleIdByName(roleName) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT id
        FROM roles
        WHERE title = ?
      `,
        [roleName],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  addNewRole(title, salary, department) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
      INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?); 
        `,
        [title, salary, department],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }

  deleteRoleByName(title) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `DELETE FROM roles WHERE title = ?`,
        [title],
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }
}

module.exports = Roles;
