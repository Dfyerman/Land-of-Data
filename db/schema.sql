DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE departments (
    id INTEGER,

    name VARCHAR(100)
);