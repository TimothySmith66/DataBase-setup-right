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
                    //console.log(answers.start)
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
            message: "What is the employee's first name?",
            name: "srchEmployee",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "srchEmployee2"
        }
        ])
        .then(function (answers) {


            const response = answers.srchEmployee + answers.srchEmployee2;
            // console.table(answers.srchEmployee);
            const query = "INSERT INTO employee( first_name, last_name,  role_id, manager_id";
            //values( "Tanner", "Smith", 4477, 9898);
            //    var query = "SELECT top_albums.year, top_albums.position, top_albums.artist, top_albums.album, top5000.song"
            //    + " FROM top_albums INNER JOIN top5000"
            //    + " ON (top_albums.artist = top5000.artist AND top_albums.year = top5000.year)"
            //    + " WHERE top_albums.artist = ?"
            //    + " ORDER BY top_albums.year, top_albums.position;";
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

   

function viewRoles() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "You forsure? contains sensitive information",
                name: "yesOrNo",
            },
        ])
        .then((answers) => {
        
            connection.query("select * from role;", answers, function (err, res) {
                if (err) {
                    console.log(err);
                }  {
                    console.table(res);
                }
            }
            );
        });
}
function viewDepartments() {
    inquirer.prompt([{
        type: "input",
        message: "see departments:",
        name: "srchdepartments"
    }])
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
function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter an artist",
        name: "artistSearch"
    }])
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
        message: "Please enter a song title",
        name: "songSearch"
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




