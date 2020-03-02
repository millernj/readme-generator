const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { renderMarkdown } = require('./src/markdown.js');
const { getUser, getShield, checkProjectUrl } = require('./src/api.js');

const writeFileAsync = util.promisify(fs.writeFile);

const main = async () => {
  let githubUser;
  const userInput = await inquirer.prompt([
    {
      message: 'What is your Github username?',
      name: 'username',
      validate: async (input) => {
        try {
          const user = await getUser(input);
          githubUser = user;
          return true;
        } catch (error) {
          return `${error}\n${chalk.red('>>')} Please enter valid username`;
        }
      }
    },
    {
      message: 'What is your project\'s name?',
      name: 'project',
      validate: async (input) => {
        try {

          const projectUrl = await checkProjectUrl(githubUser.githubUrl, input);
          githubUser.projectUrl = projectUrl;
          return true;
        } catch (error) {
          return `${error}\n${chalk.red('>>')} Please enter valid project`;
        }
      }
    },
    {
      message: 'Please write a short description of your project:',
      name: 'description'
    },
    {
      type: 'list',
      message: 'What kind of license should your project have?',
      name: 'license',
      choices: [
        'MIT',
        'APACHE 2.0',
        'GPL 3.0',
        'BSD 3',
        'None'
      ]
    },
    {
      message: 'What command should be run to install dependecies?',
      default: 'npm i',
      name: 'install'
    },
    {
      message: 'What command should be run to run tests?',
      default: 'npm test',
      name: 'test'
    },
    {
      message: 'What does the user need to know about using the repo?',
      name: 'usage'
    },
    {
      message: 'What does the user need to know about contributing to the repo?',
      name: 'contributing'
    }
  ])
  const shield = await getShield(userInput.license);
  const markdown = renderMarkdown({user: githubUser, shield, ...userInput});
  await writeFileAsync('README.md', markdown);
  console.log(chalk.green('Done!'))
}

main();