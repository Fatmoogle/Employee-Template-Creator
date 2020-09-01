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

// Function that will start the application
function beginApp() {
    inquirer.prompt([
        {
        type: "list",
        name: "begin",
        message: "Hello! Welcome to my Employee Template Generator Application.",
        choices: ["Add Employee", "Quit"]
        }
    ]).then(answers => {
        if(answers.begin === "Add Employee"){
            promptUser();
        }else{
            console.log("Goodbye!")
        };
    })
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
        addAnother();
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
        addAnother();
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
        addAnother();
    })
};

// This function asks if the user would like to add another employee
// or if they would like to finish and generate the HTML file
function addAnother(userInput){
    inquirer.prompt([
        {
        type: "list",
        name: "add",
        message: "What would like to do?",
        choices: ["Add another", "Finish and generate HTML"]
        }
    ]).then(answers => {
        if(answers.add === "Add another"){
            promptUser();
        }else{
            writeFile(outputPath, render(employeeList));
            console.log("Your HTML file has been generated in the output folder.")
        }
    })
}

// Function to start the application
beginApp();

