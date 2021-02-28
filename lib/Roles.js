const connection = require("../db/database");
const cTable = require("console.table");
const inquirer = require("inquirer"); // TODO: DELETE

class Roles {
  constructor() {}
  getRolesVerbose() {
    return new Promise(function (resolve, reject) {
      connection.query(
        `
        SELECT roles.title, roles.salary, departments.name AS department_name
        FROM roles
        INNER JOIN departments
        ON roles.department_id = departments.id 
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
        WHERE title = '${roleName}'
      `,
        function (err, res) {
          if (err) throw err;
          resolve(res);
        }
      );
    });
  }
}

// const prompt = () => {
//   return new Roles().getRoleIdByName('Lead Engineer').then((res) => {
//     // let roles = [];
//     // for (let i = 0; i < res.length; i++) {
//     //   roles.push(res[i].title);
//     // }
//     console.log(res[0].id)
//   });
// };
// prompt();

module.exports = Roles;
