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





db.query('SELECT * FROM department;', function (err, data) {
    console.table(data);

    console.log(data[0].department_name);
// using for loop to get the values on the department and make it as a list on the questions
    var departmentList = [];

    for (let i = 0; i < data.length; i++) {
        departmentList.push(data[i].department_name);
    }

    console.log(departmentList);

    const questions = [

        {
            type: 'list',
            message: 'Please choose a license',
            name: 'license',
            choices: departmentList,
        }
    ]

    // Prompt function for question and answer
    inquirer
        .prompt(questions)

        //generating data based on the answers/response
        .then((response) => {

            console.log(response);

        })

});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});