const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// const inquirer = require('inquirer');
// const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptStart = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'Team Manager\'s name',
    },
    {
      type: 'input',
      name: 'employeeId',
      message: 'Employee ID',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email address',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Office number',
    },

  ]);

const promptMenu = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Menu',
      choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    }
  ]);


const promptIntern = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'internName',
      message: 'Team Manager\'s name',
    },
    {
      type: 'input',
      name: 'internId',
      message: 'ID',
    },
    {
      type: 'input',
      name: 'internEmail',
      message: 'Email',
    },
    {
      type: 'input',
      name: 'school',
      message: 'School',
    }
  ]);

const promptEngineer = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'enginerName',
      message: 'Team Manager\'s name',
    },
    {
      type: 'input',
      name: 'enginerId',
      message: 'ID',
    },
    {
      type: 'input',
      name: 'engineerEmail',
      message: 'Email',
    },
    {
      type: 'input',
      name: 'githubName',
      message: 'Github name',
    }
  ]);

const generateHTML = (answers) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4"> # ${answers.description}</h1>
    <p> ${answers.toc}</p>
    <h3> ## How to install?</h3>
    <p> * ${answers.installation}</p>
    <h3> ## Usage</h3>
    <p> * ${answers.usage}</p>
    <h3> ## License </h3>
    <p> ${answers.license} </p>
    <h3> ## Contributing: </h3>
    <p> * ${answers.contributing} </p>
    <h3> ## Tests: </h3>
    <p> * ${answers.tests} </p>
    <h3> ## Questions: </h3>
    <p> * ${answers.questions} </p>
    <p>![Kiku](put your image file name here)</p>
  </div>
</div>
</body>
</html>`;

let interns = [];
let engineers = [];


promptStart()
  .then((answers) => {

    const manager = new Manager(
      answers.managerName,
      answers.employeeId,
      answers.email,
      answers.officeNumber
    );
    console.log('manager');
    console.log(manager);

    promptMenu().then((menu) => {

      if (menu.option === 'Finish building the team') {
        return;
      }
      if (manager.option === 'Add an intern') {
        promptIntern().then((internAnswers) => {
          const intern = new Intern(
            internAnswers.internName,
            internAnswers.internId,
            internAnswers.engineerEmail,
            internAnswers.school
          );

          console.log('intern');
          console.log(intern);

          interns.concat(intern)
        })
      }
      if (manager.option === 'Add an engineer') {
        promptEngineer().then((engineerAnswers) => {
          const engineer = new Engineer(
            engineerAnswers.enginerName,
            engineerAnswers.enginerId,
            engineerAnswers.enginerEmail,
            engineerAnswers.githubName
          );

          console.log('engineer');
          console.log(engineer);

          engineers.concat(engineer)
        }

        );
      }
    });

  })
  // .then((answers) => writeFileAsync('Employee.html', generateHTML(answers)))
  // .then(() => console.log('Successfully wrote to Employee.html'))
  // .catch((err) => console.error(err));
