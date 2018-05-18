const inquirer = require('inquirer');

console.log(process.env.EDITOR);
if (!process.env.EDITOR) {
    process.env.EDITOR = "nano";
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
            // validate: function (value) {
            //     if(value.length) {
            //         return true;
            //     }

            //     return "Please enter contents for the filename in the gist"
            // }
        }
    ]

    return inquirer.prompt(questions);
}

async function run() {
    const data = await askGistDetails();

    console.log(JSON.stringify(data, null, "  "));

}

run();
