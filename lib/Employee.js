class Employee {
  constructor(id, first_name, last_name, role_id, manager_id) {
    this.id = id;
    this.first_name_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }

  getEmployee() {
    return {
      id: this.id,
      firtst_name: this.first_name,
      last_name: this.last_name,
      role_id: this.role_id,
      manager_id: this.manager_id,
    };
  }

  getEmployeeById(id) {
    //
  }
}
