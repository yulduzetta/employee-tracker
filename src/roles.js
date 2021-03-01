const inquirer = require("inquirer");
const cTable = require("console.table");

const Roles = require("../lib/Roles");
const Departments = require("../lib/Departments");

const roles = new Roles();
const departments = new Departments();

const handleAllRolesView = () => {
  return roles.getRolesVerbose().then((res) => {
    const table = cTable.getTable("\n", res);
    console.log(table);
  });
};

const addNewRolePrompts = () => {
  return departments.getAllDepartmentsNames().then((res) => {
    let existingDepartments = [];

    for (let i = 0; i < res.length; i++) {
      existingDepartments.push(res[i].department_name);
    }
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter a new role title",
        validate: (title) => {
          if (title) {
            return true;
          } else {
            console.log(`Please enter a new role title`);
            return false;
          }
        },
      },
      {
        type: "number",
        name: "salary",
        message: "Enter salary for a new role",
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log(`Please enter salary for a new role`);
            return false;
          }
        },
      },
      {
        type: "list",
        name: "departmentName",
        message: `Choose the department`,
        choices: existingDepartments,
      },
    ]);
  });
};

const handleNewRole = () => {
  return addNewRolePrompts().then(({ title, salary, departmentName }) => {
    return departments.getDepartmentIdByName(departmentName).then((res) => {
      const department_id = res[0].id;
      return roles.addNewRole(title, salary, department_id).then(() => {
        console.log(
          `"${title}" role has been successfully added to the database`
        );
      });
    });
  });
};

const removeRolePrompts = () => {
  return roles.getRoles().then((res) => {
    let existingRoles = [];

    for (let i = 0; i < res.length; i++) {
      existingRoles.push(res[i].title);
    }
    return inquirer.prompt({
      type: "list",
      name: "title",
      message: `Choose role to delete`,
      choices: existingRoles,
    });
  });
};

const handleRemoveRole = () => {
  return removeRolePrompts().then(({ title }) => {
    return roles.deleteRoleByName(title).then(() => {
      console.log(
        `The "${title}" role  has been successfully deleted from the database`
      );
    });
  });
};

module.exports = {
  handleAllRolesView,
  handleNewRole,
  handleRemoveRole,
};
