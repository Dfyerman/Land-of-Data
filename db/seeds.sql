-- Insert data into the department table
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- Insert data into the roles table
INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Blart', 5, NULL),
    ('Shaq', 'Lakers', 6, 5),
    ('Sarah', 'Marshall', 7, NULL),
    ('Jason', 'Kidd', 8, 7);

SELECT * FROM department;

SELECT r.id, r.title AS role_title, r.salary, d.name AS department_name
FROM roles r
JOIN department d ON r.department_id = d.id;


SELECT e.first_name, e.last_name, r.title AS role_title, r.salary, d.name AS department_name
FROM employee e
JOIN roles r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id;
