UPDATE employees
SET roles_id = 1
WHERE id = 1;

SELECT *
FROM department;
+----+-----------------+
| id | department_name |
+----+-----------------+
|  1 | Sales           |
|  2 | Engineering     |
|  3 | Marketing       |
|  4 | Service         |
|  5 | Law Group       |
+----+-----------------+



<--adding roles__>
INSERT INTO roles (title, salary, department_id) 
VALUES ("vp", 100000, 1)
SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.department_name AS Department
FROM ROLES INNER JOIN department ON roles.department_id=department.id;
    
+----+------------------+--------+---------------+
| id | title            | salary | department_id |
+----+------------------+--------+---------------+
|  1 | sales            | 100000 |             1 |
|  2 | customer service |  70000 |             4 |
|  3 | engineer         | 150000 |             3 |
|  4 | lawyer           | 210000 |             2 |
|  5 | vp               | 100000 |          NULL |
+----+------------------+--------+---------------+

SELECT * FROM roles INNER JOIN department ON roles.department_id=department.id

INSERT INTO department (department_name)
VALUES ("EMIL")
SELECT * FROM department



SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.department_name, manager.manager_name
FROM employees
JOIN roles ON employees.roles_id = roles.id
JOIN department ON roles.department_id = department.id
JOIN manager ON employees.manager_id=manager.id
ORDER BY employees.id;

+------------+----------------+------------------+--------+-----------------+------------+
| first_name | last_name      | title            | salary | department_name | manager_id |
+------------+----------------+------------------+--------+-----------------+------------+
| Arthur     | Miller         | engineer         | 150000 | Marketing       |          1 |
| Chinua     | Achebe         | sales            | 100000 | Sales           |          2 |
| Margaret   | Atwood         | sales            | 100000 | Sales           |          3 |
| Gabriel    | Garcia Marquez | lawyer           | 210000 | Engineering     |          3 |
| Simone     | de Beauvoir    | customer service |  70000 | Service         |          2 |
+------------+----------------+------------------+--------+-----------------+------------+




<<-USE THIS FOR ROLES LIST--->>
SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.department_name AS Department
FROM ROLES INNER JOIN department ON roles.department_id=department.id;
+----+------------------+--------+-------------+
| ID | Title            | Salary | Department  |
+----+------------------+--------+-------------+
|  1 | sales            | 100000 | Sales       |
|  2 | customer service |  70000 | Service     |
|  3 | engineer         | 150000 | Marketing   |
|  4 | lawyer           | 210000 | Engineering |
+----+------------------+--------+-------------+


SELECT employees.first_name AS Name,
roles.title AS title
FROM employees
LEFT JOIN roles ON employees.roles_id = roles.id

+----------+------------------+
| Name     | title            |
+----------+------------------+
| Arthur   | engineer         |
| Chinua   | sales            |
| Margaret | sales            |
| Gabriel  | lawyer           |
| Simone   | customer service |
+----------+------------------+


<<-USE THIS FOR EMPLOYEES LIST--->>
SELECT employees.first_name AS First_name, 
employees.last_name AS Last_Name, 
roles.title AS Title, 
department.department_name AS Department, 
roles.salary AS Salary,
manager.manager_name AS Manager
FROM employees INNER JOIN roles ON employees.roles_id=roles.id
INNER JOIN department ON employees.roles_id=department.id
INNER JOIN manager ON employees.manager_id=manager.id;

+------------+----------------+------------------+-------------+--------+-----------+
| First_name | Last_Name      | Title            | Department  | Salary | Manager   |
+------------+----------------+------------------+-------------+--------+-----------+
| Arthur     | Miller         | engineer         | Marketing   | 150000 | Joe Doe   |
| Chinua     | Achebe         | sales            | Sales       | 100000 | Jane Bane |
| Simone     | de Beauvoir    | customer service | Engineering |  70000 | Jane Bane |
| Margaret   | Atwood         | sales            | Sales       | 100000 | Rick Shaw |
| Gabriel    | Garcia Marquez | lawyer           | Service     | 210000 | Rick Shaw |
+------------+----------------+------------------+-------------+--------+-----------+



SELECT employees.first_name AS name, department.department_name AS department
FROM employees INNER JOIN department ON employees.roles_id=department.id;

+----------+------------+
| name     | department |
+----------+------------+
| Arthur   | Marketing  |
| Chinua   | Sales      |
| Margaret | Sales      |
+----------+------------+

SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, department.department_name AS Department
FROM employees INNER JOIN department ON employees.roles_id=department.id;
+------------+-----------+------------+
| First_Name | Last_Name | Department |
+------------+-----------+------------+
| Arthur     | Miller    | Marketing  |
| Chinua     | Achebe    | Sales      |
| Margaret   | Atwood    | Sales      |
+------------+-----------+------------+
