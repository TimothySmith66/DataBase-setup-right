const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Port I will be using 
    port: 3306,

    // username
    user: "root",

    // Your password
    password: "whatitDo2You",
    database: "employers2_db"
});
//connect to the mysql date base
connection.connect((err) => {
    if (err) {

        throw err;
    }
    return mainMenu();
});
//create a function that prompts the use what they would like to do.
function mainMenu() {
    return inquirer
        .prompt({
            type: 'list',
            message: "What would you like to do?",
            name: 'start',
            choices: [
                "view all employees",
                "view all roles",
                "view all departments",
                "add employee",
                "add departments",
                "Add roles",
                "update employee roles"],

        })
        // main menu that will give different option through the call of functions
        .then(answers => {
            console.table(answers);
            switch (answers.start) {
                case 'view all employees': searchEmployees();
                    break;
                case 'view all roles': viewRoles();
                    break;
                case 'view all departments': viewDepartments();
                    break;
                case 'addEmployee': addEmployee();
                    break;
                case 'add departments': addDepartments();
                    break;
                case 'Add roles': addRole();
                    break;
                case 'update employee roles':
                    update();
                    break;
                default:
                    connection.end();
            }
        })

        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
}
//connection.query(`SELECT * FROM `` WHERE `author` = "David`)
function searchEmployees() {
    inquirer
        .prompt([{
            type: "input",
            message: "press any character to see all employees",
            name: "srchEmployee",
        }])
        .then((answers) => {

            let response = answers.start;
            const query = "select e.id, e.first_name, e.last_name, salary, title, department_id, r.department_id from employee as e left join role as r on e.manager_id = r.id left join department as d on r.department_id = d.id;";
            connection.query(query, response, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(res);
                }
            }
            );
        });
}



function viewRoles(answers) {
    inquirer
        .prompt([{
            type: "input",
            message: "press any character to see all role data",
            name: "srchEmployee",
        },
        ])
        .then((answers) => {


            let response = answers.start;
            const query = "select * from role;";
            connection.query(query, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(res)
                }

                mainMenu();
            });
        });
}


function viewDepartments() {
    inquirer.prompt([{
        type: "input",
        message: "see departments by pressing any key!",
        name: "srchdepartments"
    }])
        .then((answers) => {
            let response = answers.start;
            const query = "select * from department;";
            connection.query(query, answers, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(res);
                }
            }
            );
        });
}
function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter an artist",
        name: "artistSearch"
    }])
        .then((answers) => {
            connection.query("update ", answers, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(res);
                }
            }
            );
        });
}

function addDepartments() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter starting range",
            name: "startingRange"
        },
        {
            type: "input",
            message: "insert values to add to department",
            name: "endingRange"
        },
    ])
        .then((answers) => {
            connection.query("select * from department;", answers, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(res);
                }
            }
            );
        });
}
function addRole() {
    inquirer.prompt([{
        type: "input",
        message: "add a role to the database here",
        name: "addData"
    }])
        .then(answers => {
            connection.query()
        }

        )
}
function update() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter a song title",
        name: "songSearch"
    }])
        .then(answers => {
            connection.query()
        })
    //     .then
    // connection.query("SELECT * FROM employee INNER JOIN role INNER JOIN department", function (err, res) {)
}




