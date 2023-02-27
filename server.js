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
        handleOption(answers)
    });
  }

  //use a switch statement to choose the correct function based on the users choice  
function handleOption ({options}) {
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






  init();