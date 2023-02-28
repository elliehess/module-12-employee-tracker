-- insert data for department, role, and employee tables 
INSERT INTO department (name) 
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 90000, 1),
       ("Analyst", 80000, 2),
       ("Salesperson",70000, 3),
       ("Team Manager", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cameron", "Diaz", 1, 4),
       ("Drew", "Barrymore", 2, 4),
       ("Lucy", "Liu", 3, 4),
       ("John", "Bosley", 4, NULL);

