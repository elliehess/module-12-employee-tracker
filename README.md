# Module 12 Challenge - Employee Tracker

## Description

This is an employee tracker application so that you are able to view and manage the departments, roles and employees in your company so that you can organize and plan your business. 


## Table of Contents 

- [Visuals](#visuals)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Visuals


[Click here for Walkthrough Video](https://ancient-tor-12985.herokuapp.com/)

## Installation

If you would like to see this application through the terminal, you will need to install the "Inquirer package".
In VS Code, open the Terminal. 
On the command line, type the folling command:

npm i 

You will also need to use the MySQL2 package to connect to the MySQL database along with the console.table package to print MySQL rows to the console.

On the command line, type the folling commands:

npm i mysql 
npm i console.table --save 

Then, the application will be invoked by using the following command:

node server.js

## Usage

When you start the application, you will be presented with a menu of options. If you choose to view all departments, you will be presented with a formatted table showing department names and department ids
If you choose to view all roles, you will be presented with the job title, role id, the department that role belongs to, and the salary for that role. If you choose to view all employees, you will be presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to. You will also have the option to add a department add a role, and an employee. The application will prompt you for input. You can also choose to update an employee role and will be prompted for to select an employee to update and their new role and this information will be updated in the database.

## Tests 

N/A

## License

Boost Software License 1.0

## Badges

[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)

## Questions 

Any questions? 
Feel free to check out my work here:
[@elliehess](@elliehess)

Or you can reach out to me at my email address below:
elhess03@gmail.com
