const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Employee = require("./lib/Employee");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty array to hold the employee information
const employeeList = [];

// Function to create a file when called
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if(err) throw err;
    });
}

// Function to initialize the inquirer prompt and ask the needed questions
// Depending on what role they are,
// the if/else statements will control what question is asked last
function promptUser() {
    inquirer.prompt([
        {
        type: "input",
        name: "name",
        message: "What is your name?"
        },
        {
        type: "input",
        name: "id",
        message: "What is your ID number?"
        },
        {
        type: "input",
        name: "email",
        message: "What is your email?"
        },
        {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager", "Intern", "Engineer"]
        }
    ]).then(answers => {
        if(answers.role === "Manager"){
            managerPrompt(answers);
        }else if(answers.role === "Engineer"){
            engineerPrompt(answers);
        }else{
            internPrompt(answers);
        };
    })
}

// Function to create a Manager specific layout
function managerPrompt(userInput){
    inquirer.prompt([
        {
        type: "input",
        name: "office",
        message: "What is your office number?"
        }
    ]).then(answers => {
        const newManager = new Manager(userInput.name, userInput.id, userInput.email, answers.office)
        employeeList.push(newManager);
        console.log(employeeList);
        writeFile(outputPath, render(employeeList));
    })
};

// Function to create a Engineer specific layout
function engineerPrompt(userInput){
    inquirer.prompt([
        {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
        }
    ]).then(answers => {
        const newEngineer = new Engineer(userInput.name, userInput.id, userInput.email, answers.github);
        employeeList.push(newEngineer);
        console.log(employeeList);
        writeFile(outputPath, render(employeeList));
    })
};

// Function to create a Intern specific layout
function internPrompt(userInput){
    inquirer.prompt([
        {
        type: "input",
        name: "school",
        message: "What school are you currently attending?"
        }
    ]).then(answers => {
        const newIntern = new Intern(userInput.name, userInput.id, userInput.email, answers.school);
        employeeList.push(newIntern);
        console.log(employeeList);
        writeFile(outputPath, render(employeeList));
    })
};

// Function to start the application
promptUser();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.







// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
