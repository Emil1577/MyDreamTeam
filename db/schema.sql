    DROP DATABASE IF EXISTS mydreamteam_db;
    CREATE DATABASE mydreamteam_db;

    USE mydreamteam_db;

    DROP TABLE IF EXISTS department;
    CREATE TABLE department (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        department_name VARCHAR (30)

    );

    DROP TABLE IF EXISTS roles;
    CREATE TABLE roles (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR (30),
        salary INT,        
        department_id INT,
        FOREIGN KEY (department_id)
        REFERENCES department(id)
    );

    DROP TABLE IF EXISTS manager;
    CREATE TABLE manager (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        manager_name VARCHAR (30)

    );

    DROP TABLE IF EXISTS employees;
    CREATE TABLE employees (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR (30) NOT NULL,
        last_name VARCHAR (30) NOT NULL,
        manager_id INT,  
        roles_id INT,
        FOREIGN KEY (manager_id)
        REFERENCES manager(id),
        FOREIGN KEY (roles_id)
        REFERENCES roles(id)
    );    