const inquirer = require("inquirer");
const Departments = require("../lib/Departments");
const cTable = require("console.table");

const departments = new Departments();

const handleAllDeparmentsView = () => {
  return departments.getAllDepartmentsNames().then((res) => {
    const table = cTable.getTable("\n", res);
    console.log(table);
  });
};

const addNewDepartmentPrompts = () => {
  return inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "What is the name of the department?",
    validate: (departmentName) => {
      if (departmentName) {
        return true;
      } else {
        console.log(`Please enter the name of your new department`);
        return false;
      }
    },
  });
};

const handleNewDepartment = () => {
  return addNewDepartmentPrompts().then(({ departmentName }) => {
    return departments.addNewDepartment(departmentName).then(() => {
      console.log(
        `\n New department: "${departmentName}" has been successfully added to the database \n`
      );
    });
  });
};

const chooseDepartmentPrompts = () => {
  return departments.getAllDepartmentsNames().then((res) => {
    let existingDepartments = [];

    for (let i = 0; i < res.length; i++) {
      existingDepartments.push(res[i].department_name);
    }
    return inquirer.prompt({
      type: "list",
      name: "departmentName",
      message: `Choose department`,
      choices: existingDepartments,
    });
  });
};

const handleRemoveDepartment = () => {
  return chooseDepartmentPrompts().then(({ departmentName }) => {
    return departments.deleteDepartment(departmentName).then(() => {
      console.log(
        `The "${departmentName}" department has been successfully deleted from the database`
      );
    });
  });
};

const handleDepartmentLevelBudget = () => {
  return chooseDepartmentPrompts().then(({ departmentName }) => {
    return departments.getDepartmentBudget(departmentName).then((res) => {
      const table = cTable.getTable("\n", res);
      console.log(table);
    });
  });
};

module.exports = {
  handleAllDeparmentsView,
  handleNewDepartment,
  handleRemoveDepartment,
  handleDepartmentLevelBudget,
};
