const express = require('express');
const inquirer = require('inquirer')
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'mydreamteam_db'
    },
    console.log(`Connected to the mydreamteam_db database.`)
);

const initialQuestions = [

    {
        name: 'selection',
        type: 'list',
        message: 'Please choose a license',
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "EXIT"
        ]
    }
]

function initializeAnswers() {
   
    // prompt user actions using inquirer 
    inquirer.prompt(initialQuestions)
    
    // await user responce from inquirer
    .then(function(initialQuestions) {

        if(initialQuestions.selection == "View All Employees") {         

            viewAllEmployees();
        
        }else if(initialQuestions.selection  == "View All Departments") {

            viewAllDepartments();

        }else if(initialQuestions.selection  == "View All Roles") {

            viewAllRoles();

        }else if(initialQuestions.selection  == "Add employee") {

            addEmployee();
            
        }else if(initialQuestions.selection  == "Add Department") {

            addDepartment();
       
        }else if(initialQuestions.selection  == "Add role") {

            addRole();

        }else if(initialQuestions.selection  == "Edit employee") {

            updateEmployee();

        }else if(initialQuestions.selection  == "Remove employee") {

            deleteEmployee();

        }else if(initialQuestions.selection  == "EXIT") {

            exit();

        };
        

    });    

};

const showEmployees = `SELECT employees.id AS ID, 
employees.first_name AS First_name, 
employees.last_name AS Last_Name, 
roles.title AS Title, 
department.department_name AS Department, 
roles.salary AS Salary,
manager.manager_name AS Manager
FROM employees INNER JOIN roles ON employees.roles_id=roles.id
INNER JOIN department ON employees.roles_id=department.id
INNER JOIN manager ON employees.manager_id=manager.id;`

const showRoles = `SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.department_name AS Department
FROM ROLES INNER JOIN department ON roles.department_id=department.id;`



function viewAllEmployees(){
    console.log("triggered")

    db.query(showEmployees, function (err, data) {
        console.table(data);
        initializeAnswers()
    });
    
}

function viewAllRoles(){

    db.query(showRoles, function (err, data) {
        console.table(data);
        initializeAnswers()
    });
    
}

function viewAllDepartments(){

    db.query('SELECT * FROM department;', function (err, data) {
        console.table(data);
        initializeAnswers()
    });
    
}

function addDepartment () {

    console.log('add department')
const newDept = [

        {
            type: 'input',
            message: 'Please provide new dapartment name',
            name: 'name',

        }
    ]

    inquirer
        .prompt(newDept)

        //generating data based on the answers/response
        .then((response) => {

            console.log(response);

     var answerDept = response;

    const addDeptQuery = `INSERT INTO department SET ?;`

    const deleteQuery = `DELETE FROM department
    Where id =7;`


    db.query(addDeptQuery, {answerDept}, function (err, data) {

        initializeAnswers()
    });

       })

}
// db.query('SELECT * FROM department;', function (err, data) {
//     console.table(data);

//     console.log(data[0].department_name);
//     // using for loop to get the values on the department and make it as a list on the questions
//     var departmentList = [];

//     for (let i = 0; i < data.length; i++) {
//         departmentList.push(data[i].department_name);
//     }

//     console.log(departmentList);

//     const questions = [

//         {
//             type: 'list',
//             message: 'Please choose a license',
//             name: 'license',
//             choices: departmentList,
//         }
//     ]

//     // Prompt function for question and answer
//     inquirer
//         .prompt(questions)

//         //generating data based on the answers/response
//         .then((response) => {

//             console.log(response);

//         })

// });


initializeAnswers();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
