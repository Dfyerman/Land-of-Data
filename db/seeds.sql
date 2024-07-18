INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- Insert data into the roles table
INSERT INTO roles (title, department_id, salary)
VALUES ('Sales Lead', 1, 62000),
       ('Salesperson', 1, 62000),
       ('Lead Engineer', 2, 62000),
       ('Software Engineer', 2, 62000),
       ('Account Manager', 3, 62000),
       ('Accountant', 3, 62000),
       ('Legal Team Lead', 4, 62000),
       ('Lawyer', 4, 62000);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, roles)
VALUES ('John', 'Doe', 1),
       ('Mike', 'Chan', 1),
       ('Ashley', 'Rodriguez', 1),
       ('Kevin', 'Tupik', 2),
       ('Kobe', 'Bryant', 2),
       ('Shaq', 'Lakers', 3),
       ('Ben', 'Riker', 4),
       ('Jason', 'Kidd', 4);