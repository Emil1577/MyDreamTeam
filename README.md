# MyDreamTeam

## Decription

MyDreamTeam is a project that allows you to manage your employees.  It will give you an option to add an employee, roles, and department.  It will you also let you update your employees role or position. The cool thing about this app is that you can view your employees in a table that shows his roles, salary, manager and department.

Here is the link to my website.  Feel free to share with your friends and family.

https://github.com/Emil1577/MyDreamTeam

## Installation Instructions

First you need to clone my repository. Go to https://github.com/Emil1577/MyDreamTeam. Then run your terminal on the folder of the cloned repository.  You'll also need to install the npm by writing "npm install'.  This will generate "node_modules" folder.  You also need to run "npm init", this will then create "package.json". After which is you are ready to use the application. Then on your terminal type in "node server.js"

## Table Of Contents

1. [Webpage Screenshot](#webpage-screenshots)
2. [Code Snippets](#code-snippets)
3. [How to use:](#how-to-use)
4. [My Contact Information](#my-contact-information)

## Webpage Screenshots:

![Screen Shot 2023-02-03 at 3 30 51 AM](https://user-images.githubusercontent.com/119825000/216592901-4e0ab54b-e59c-402b-9d30-2348bb2c9b9a.png)

![Screen Shot 2023-02-03 at 3 29 51 AM](https://user-images.githubusercontent.com/119825000/216592724-3359d7a3-8108-4116-b6f2-694e9f2ae661.png)


## Code Snippets: 
    
### Function to execute the inquire questions prompt.

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


### Function for multiple choiecs if the manager wish to add employees or not, and what position of the employee.

    function addEmployee() {

        var roleList = [];
        var managerList = [];

        db.query('SELECT * FROM roles;', function (err, data) {
            //     console.table(data);
            for (let i = 0; i < data.length; i++) {
                roleList.push(data[i].title);
            }
        });

        //console.log(roleList);

        db.query('SELECT * FROM manager;', function (err, data) {

            for (let i = 0; i < data.length; i++) {
                managerList.push(data[i].manager_name);
            }

        });

## Function to update employee.

      function updateEmployee() {

          var updateRoleList = [];
          var empList = [];

          db.query('SELECT * FROM roles;', function (err, data) {
              //     console.table(data);
              for (let i = 0; i < data.length; i++) {
                  updateRoleList.push(data[i].title);
              }
              //console.log(updateRoleList);
              // using for loop to get the values on the department and make it as a list on the question

          });


          db.query('SELECT * FROM employees;', function (err, data) {

              for (let i = 0; i < data.length; i++) {
                  empList.push(data[i].first_name);

              }
              //console.log(empList);
              // Prompt function for question and answer

          });

      
## How to use:

After completing the installation instruction, on the same terminal just type in "node index.js" then enter. The terminal will then ask you multiple questions.  Just follow the prompts, the questions are straight forward so you'll be able to veiew and make actions on your employees.

Here's a short video on how to use. https://drive.google.com/file/d/1Mp2VNy0PyLjJiyE4yJ9gBZItD07g0KJP/view


## My Contact Information:

* [My LinkedIn](https://www.linkedin.com/in/emil-ronquillo-76832a32/)
* [My Github](https://github.com/Emil1577)
* [My Email](mailto:emilronquillo@gmail.com)

## Thank you for stopping by. 

Special thanks to all my Instructor, tutors and my colleagues
