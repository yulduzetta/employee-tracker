const inquirer = require("inquirer");
const connection = require("../db/database");
const Departments = require("../lib/Departments");
const Roles = require("../lib/Roles");
const Employees = require("../lib/Employees");

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

const interactWithUser = () => {
  whatWouldYouLikeToDoPrompt()
    .then(({ action }) => {
      switch (action) {
        case "Exit the application":
          return process.exit();
        case "View All Departments":
          return new Departments().getAllDepartmentsNames();
        case "View All Roles":
          return new Roles().getAllRoles();
        case "View All Employees":
          return new Employees().getAllEmployees();
      }
    })
    .then(() => {
      return interactWithUser();
    });
};

module.exports = { interactWithUser };
