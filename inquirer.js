const inquirer = require('inquirer');

function askGithubCredentials() {
    const questions = [
        {
            name: 'username',
            type: 'input',
            message: 'Enter your Github username or e-mail address',
            validate: function (value) {
                if (value.length) {
                    return true;
                }

                return "Please enter your username or e-mail address";
            }
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your password',
            validate: function (value) {
                if (value.length) {
                    return true;
                }

                return "Please enter your password"
            }
        }
    ]

    return inquirer.prompt(questions);
}

function askGistDetails() {
    const questions = [
        {
            type: 'input',
            name: 'filename',
            message: 'Enter a filename',
            validate: function (value) {
                if (value.length) {
                    return true;
                }

                return "Enter a filename for the gist (including extension) : "
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter the description for the gist : '
        },
        {
            type: 'editor',
            name: 'content',
            message: "Enter the content for the filename in the gist",
            validate: function (value) {
                if(value.length) {
                    return true;
                }

                return "Please enter contents for the filename in the gist"
            }
        }
    ]

    return inquirer.prompt(questions);
}

module.exports = {
    askGithubCredentials,
    askGistDetails
};