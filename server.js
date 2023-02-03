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
//Initial questionaires
const initialQuestions = [

    {
        name: 'selection',
        type: 'list',
        message: 'Please choose an action',
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

        // await user responce from inquirer then if function determines which function to execute
        .then(function (initialQuestions) {

            if (initialQuestions.selection == "View All Employees") {

                viewAllEmployees();

            } else if (initialQuestions.selection == "View All Departments") {

                viewAllDepartments();

            } else if (initialQuestions.selection == "View All Roles") {

                viewAllRoles();

            } else if (initialQuestions.selection == "Add Employee") {

                addEmployee();

            } else if (initialQuestions.selection == "Update Employee") {

                updateEmployee();

            } else if (initialQuestions.selection == "Add Department") {

                addDepartment();

            } else if (initialQuestions.selection == "Add Role") {

                addRole();


            } else if (initialQuestions.selection == "EXIT") {

                exit();
            };
        });
};

// Constant to show employees using query
const showEmployees = `SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.department_name, manager.manager_name
FROM employees
JOIN roles ON employees.roles_id = roles.id
JOIN department ON roles.department_id = department.id
JOIN manager ON employees.manager_id=manager.id
ORDER BY employees.id;`

const showRoles = `SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.department_name AS Department
FROM ROLES INNER JOIN department ON roles.department_id=department.id;`


// function to show employees
function viewAllEmployees() {
    db.query(showEmployees, function (err, data) {
        console.table(data);
        initializeAnswers()
    });
}
// function to show roles
function viewAllRoles() {
    db.query(showRoles, function (err, data) {
        console.table(data);
        initializeAnswers()
    });
}
// function to show departments
function viewAllDepartments() {
    db.query('SELECT * FROM department;', function (err, data) {
        console.table(data);
        initializeAnswers()
    });
}
//Adding departments
function addDepartment() {

    const newDept = [
        {
            type: 'input',
            message: 'Please provide new dapartment name',
            name: 'name',
        }
    ]

    inquirer
        .prompt(newDept)

        .then((response) => {

            console.log(response.name);

            const addDeptQuery = "INSERT INTO department SET ?"

            db.query(addDeptQuery,
                {
                    department_name: response.name
                },

                function (err, data) {
                    initializeAnswers()
                });
        })
}
//adding roles will require loop function for the dropdown menu
function addRole() {

    console.log('add department')
    var departmentList = [];
    db.query('SELECT * FROM department;', function (err, data) {

        // using for loop to get the values on the department and make it as a list on the question
        for (let i = 0; i < data.length; i++) {
            departmentList.push(data[i].department_name);
        }
    });

    const newRole = [

        {
            type: 'input',
            message: 'Please provide new title',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Please provide salary',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Please choose a department',
            name: 'department',
            choices: departmentList,
        }
    ]

    inquirer
        .prompt(newRole)
        //generating data based on the answers/response
        .then((response) => {

            const roleId = departmentList.indexOf(response.department) + 1;

            const addRoleQuery = "INSERT INTO roles SET ?";

            db.query(addRoleQuery,
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: roleId,
                },
                function (err, data) {

                    initializeAnswers()

                });
        })
}

//adding employees using loop to identify the id number
function addEmployee() {

    var roleList = [];
    var managerList = [];

    db.query('SELECT * FROM roles;', function (err, data) {
        //     console.table(data);
        for (let i = 0; i < data.length; i++) {
            roleList.push(data[i].title);
        }
    });

    console.log(roleList);

    db.query('SELECT * FROM manager;', function (err, data) {

        for (let i = 0; i < data.length; i++) {
            managerList.push(data[i].manager_name);
        }

    });

    const newEmployee = [

        {
            type: 'input',
            message: 'Please provide new employee first name',
            name: 'first_name',
        },
        {
            type: 'input',
            message: 'Please provide new employee last name',
            name: 'last_name',
        },
        {
            type: 'list',
            message: 'Please choose a manager',
            name: 'manager',
            choices: managerList,

        },
        {
            type: 'list',
            message: 'Please choose a title',
            name: 'role',
            choices: roleList,

        },
    ]

    inquirer
        .prompt(newEmployee)
        //generating data based on the answers/response
        .then((response) => {

            const roleId = roleList.indexOf(response.role) + 1;
            const managerId = managerList.indexOf(response.manager) + 1;

            const addEmployeeQuery = "INSERT INTO employees SET ?";

            db.query(addEmployeeQuery,
                {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    manager_id: managerId,
                    roles_id: roleId
                },
                function (err, data) {

                    initializeAnswers()

                });
        })
}



function updateEmployee() {

    var updateRoleList = [];
    var empList = [];

    db.query('SELECT * FROM roles;', function (err, data) {
        //     console.table(data);
        for (let i = 0; i < data.length; i++) {
            updateRoleList.push(data[i].title);
        }
        console.log(updateRoleList);
        // using for loop to get the values on the department and make it as a list on the question

    });


    db.query('SELECT * FROM employees;', function (err, data) {

        for (let i = 0; i < data.length; i++) {
            empList.push(data[i].first_name);

        }
        console.log(empList);
        // Prompt function for question and answer

    });



    const updateEmployee = [

        {
            type: 'input',
            message: 'Please provide reason',
            name: 'reason',
        },

        {
            type: 'list',
            message: 'Which employee you want to update?',
            name: 'employee',
            choices: empList,
        },
        {
            type: 'list',
            message: 'Please choose a title',
            name: 'role',
            choices: updateRoleList
        },
    ]

    inquirer
        .prompt(updateEmployee)

        .then((response) => {

            const roles_Id = updateRoleList.indexOf(response.role) + 1;
            const first_name = response.employee

            const addEmployeeQuery = `UPDATE employees SET roles_id = ${roles_Id} where first_name = "${first_name}";`

            console.log(addEmployeeQuery)
            db.query(addEmployeeQuery,
                // {

                //     roles_id: roles_Id

                // },
                function (err, data) {

                    initializeAnswers()

                });

            console.log(roles_Id)
            console.log(first_name)
        })
}

function exit() {

    connection.end();
}

initializeAnswers();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
