const inquirer = require("inquirer");
const Departments = require("../lib/Departments");
const Roles = require("../lib/Roles");
const Employees = require("../lib/Employees");
const employeeHandler = require("../src/employees");

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
      "View Employees by Manager",
      "View Employees by Department",
      "Delete Department",
      "Delete Role",
      "Delete Employees",
      "View the total utilized budget of a department",
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
          return employeeHandler.handleNewEmployee();
        case "Remove Employee":
          return employeeHandler.handleRemoveEmployee();
        case "Update Employee Role":
          return employeeHandler.handleUpdateEmployeeRole();
        case "Update Employee Manager":
          return employeeHandler.handleUpdateEmployeeManager();
      }
    })
    .then(() => {
      return interactWithUser();
    });
};

module.exports = { interactWithUser };
