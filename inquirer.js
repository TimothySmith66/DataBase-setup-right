
function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                name: 'start',
                choices: ["view all employees", 
                "view all roles", 
                "view all departments", 
                "add employee", 
                "add departments", 
                "Add roles", 
                "update employee roles"],

            },
        ])

        .then(answers => {
            console.(answers);
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
        
    
