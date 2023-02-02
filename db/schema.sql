    DROP DATABASE IF EXISTS mydreamteam_db;
    CREATE DATABASE mydreamteam_db;

    USE mydreamteam_db;

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

    CREATE TABLE roles (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR (30),
        salary INT,        
        department_id INT,
        FOREIGN KEY (department_id)
        REFERENCES department(id)
    );

    CREATE TABLE department (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        department_name VARCHAR (30)

    );


    CREATE TABLE manager (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        manager_name VARCHAR (30)

    );