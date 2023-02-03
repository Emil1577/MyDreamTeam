INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Marketing"),
        ("Service"),
       ("Law Group");

INSERT INTO manager (manager_name)
VALUES ("Joe Doe"),
       ("Jane Bane"),
       ("Rick Shaw");       

INSERT INTO roles (title, salary, department_id)
VALUES ("sales", 100000, 1),
       ("customer service", 70000, 4),
       ("engineer", 150000, 2),
       ("lawyer", 210000, 5);
       
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUES ("Arthur", "Miller", 1, 1),
       ("Chinua", "Achebe", 2, 3),
       ("Margaret", "Atwood", 2, 4),
       ("Gabriel", "Garcia Marquez", 1, 2),
       ("Simone", "de Beauvoir", 3, 4);