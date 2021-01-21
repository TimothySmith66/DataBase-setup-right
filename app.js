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
    database: "employer_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    insert();
    function mainMenu() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "What would you like to do?",
                    name: 'start',
                    choices: ["view all employees", "view all roles", "view all departments", "add employee", "add departments", "Add roles", "update employee roles"],
                },
            ])

            .then(answers => {
                console.log(answers);
                switch (answers.menu) {
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
            }
        })
            
                .catch ((error) => {
            console.log(error);
            process.exit(1);
        });
              }
//connection.query(`SELECT * FROM `` WHERE `author` = "David`)
function searchEmployees() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter an artist",
        name: "artistSearch"
    }])
}


function viewRoles() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter starting range",
            name: "startingRange"
        },
        {
            type: "input",
            message: "Please enter ending range",
            name: "endingRange"
        },
    ])
}
function viewDepartments() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter a song title",
        name: "songSearch"
    }])
}
function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter an artist",
        name: "artistSearch"
    }])
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
            message: "Please enter ending range",
            name: "endingRange"
        },
    ])
}
function addRole() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter a song title",
        name: "songSearch"
    }])

}
function update() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter a song title",
        name: "songSearch"
    }])

}

            });

function insert() {
    connection.query("SELECT * FROM employee INNER JOIN role INNER JOIN department", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
    
}
//const table = cTable.getTable(res)

//console.log(table);
