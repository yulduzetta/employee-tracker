DROP DATABASE IF EXISTS employees_tracker;

CREATE DATABASE employees_tracker;

USE employees_tracker;

CREATE TABLE departments (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);
-- CREATE TABLE employees (
--     id INTEGER PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INTEGER,
--     manager_id INTEGER,
-- );