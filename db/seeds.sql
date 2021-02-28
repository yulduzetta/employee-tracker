INSERT INTO departments (name)
VALUES ("Sales"),
    ("Legal"),
    ("Finance"),
    ("Engineering");
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
    ("Sales Associate", 80000, 2),
    ("Lead Engineer", 150000, 4),
    ("Software Engineer", 120000, 4),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 2),
    ("Lawyer", 190000, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Doe", 1, NULL),
    ("Mike", "Chan", 1, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Kevin", "Tipik", 4, 3),
    ("Malia", "Brown", 5, NULL),
    ("Sarah", "Lourd", 6, NULL),
    ("Tom", "Allen", 7, 6),
    ("Yulduz", "Ibrahim", 4, 3);