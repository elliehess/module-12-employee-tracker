const inquirer = require('inquirer');
require('dotenv').config();
const mysql = require('mysql2'); 

const PORT = process.env.PORT || 3001;

//Set up database connection 
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the company_db database.`)
  );

  //initial question for user to choose which function
  const init = function () {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
        },
    ])
    .then((answers) => {
        selectOption(answers)
    });
  }

  //use a switch statement to choose the correct function based on the users choice  
function selectOption ({options}) {
    switch (options) {
        case 'View All Departments':
            viewDepartments()               
            break;
        
        case 'View All Roles':
            viewRoles()        
            break;
        
        case 'View All Employees':
            viewEmployees()
            break;
        
        case 'Add A Department':
            addDepartment()
            break;
        
        case 'Add A Role':
            addRole()
            break;
            
        case 'Add An Employee':
            addEmployee()
            break;
            
        case 'Update An Employee Role':
            updateRole()
            break;
        
        default:
            console.log('Have a nice day! Goodbye.')
            break;
    }
};

//function to display Department table
viewDepartments = () => {
    db.query(
        `SELECT * FROM department`, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                console.table(results)
                init();
            };
        }
    );
};

//function to dsiplay Role table
viewRoles = () => {
    db.query(
        `SELECT 
        role.title AS 'Role', 
        role.id AS 'Role ID',
        department.id AS 'Department ID', 
        role.salary AS 'Salary' 
        FROM role LEFT JOIN department ON role.department_id = department.id`, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                console.table(results)
                init();
            };
        }
    );
};

//function to display employee table 
viewEmployees = () => {
    db.query(
        `SELECT 
        employee.id AS 'Employee ID',
        employee.first_name AS 'First Name',
        employee.last_name AS 'Last Name',
        role.title AS 'Role',
        role.department_id AS 'Department',
        role.salary AS 'Salary',
        CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
        FROM employee LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            `, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                console.table(results)
            };
        }
    );
};

//function to add a Role
const addRole = function () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'role',
            message: 'What is the title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the department ID of the role?',
        },
    ])
    .then((answers) => {
        const values = [`${answers.role}, ${answers.salary}, ${answers.department}`];
        db.query('INSERT INTO role (title, salary, department_ID) VALUES (?,?,?)', values, (err, results, fields) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('A new role was added!')
                };
            }
        );
    });
  };

  //function to add an Employee
const addEmployee = function () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the role ID of the employee?',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'What is the manager ID of the employees manager?',
        },
    ])
    .then((answers) => {
        const values = [`${answers.firstName}, ${answers.lastName}, ${answers.role}, ${answers.manager}`];
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', values, (err, results, fields) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('A new employee was added!')
                };
            }
        );
    });
  };

  //function to add a Department
const addDepartment = function () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
        },
    ])
    .then((answers) => {
        const values = [`${answers.department}`];
        db.query('INSERT INTO department (name) VALUES (?)', values, (err, results, fields) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('A new department was added!')
                };
            }
        );
    });
  };

  //function to update an employee's role
const updateRole = function () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'employeeID',
            message: 'What is the number of the employees ID?',
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the number of the employees new role?',
        },
    ])
    .then((answers) => {
        const values = [`${answers.employeeID}, ${answers.newRole}`];
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', values, (err, results, fields) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('The employees role was updated!')
                };
            }
        );
    });
  };

  init();