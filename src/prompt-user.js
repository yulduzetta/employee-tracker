const inquirer = require("inquirer");
const connection = require("../db/database");
const Departments = require("../lib/Departments");
const Roles = require("../lib/Roles");
const Employees = require("../lib/Employees");

const employees = new Employees();
const roles = new Roles();
const deparments = new Departments();

const whatWouldYouLikeToDoPrompt = () => {
  return inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "Exit the application",
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
    ],
  });
};

const addNewEmployeePrompts = () => {
  return roles.getRoles().then((res) => {
    let existingRoles = [];
    let existingManagers = [];

    for (let i = 0; i < res.length; i++) {
      existingRoles.push(res[i].title);
    }
    return employees.getManagers().then((res) => {
      for (let i = 0; i < res.length; i++) {
        existingManagers.push(res[i].manager_name);
      }
      existingManagers.push("No manager");
      return inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employees's first name?",
          validate: (firstName) => {
            if (firstName) {
              return true;
            } else {
              console.log(`Please enter your employees's name`);
              return false;
            }
          },
        },
        {
          type: "input",
          name: "lastName",
          message: `Enter your employee's'last name: `,
          validate: (lastName) => {
            if (lastName) {
              return true;
            } else {
              console.log(`Please enter your employees's last name`);
              return false;
            }
          },
        },
        {
          type: "list",
          name: "role",
          message: `Choose your employee's role `,
          choices: existingRoles,
        },
        {
          type: "list",
          name: "manager",
          message: `Choose your employee's manager `,
          choices: existingManagers,
        },
      ]);
    });
  });
};

const handleNewEmployee = () => {
  let roleId = null;
  let managerId = null;
  return addNewEmployeePrompts().then(
    ({ firstName, lastName, role, manager }) => {
      return roles.getRoleIdByName(role).then((res) => {
        roleId = res[0].id;
        return employees.getManagerIdByName(manager).then((res) => {
          if (!managerId) {
            managerId = null;
          } else {
            managerId = res[0].id;
          }
          return employees.addNewEmployee(
            firstName,
            lastName,
            roleId,
            managerId
          );
        });
      });
    }
  );
};

const interactWithUser = () => {
  whatWouldYouLikeToDoPrompt()
    .then(({ action }) => {
      switch (action) {
        case "Exit the application":
          return process.exit();
        case "View All Departments":
          return deparments.getAllDepartmentsNames();
        case "View All Roles":
          return roles.getRolesVerbose();
        case "View All Employees":
          return employees.getAllEmployees();
        case "View All Employees By Department":
          return employees.getAllEmployeesByDepartment();
        case "View All Employees By Manager":
          return employees.getAllEmployeesByManager();
        case "Add Employee":
          return handleNewEmployee();
      }
    })
    .then(() => {
      return interactWithUser();
    });
};

module.exports = { interactWithUser };
