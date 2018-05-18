const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;

const inquirer = require('./inquirer.js');
const github = require('./github.js');

async function createGist(userFilename, userContent, userDescription, userPrivate) {
    const octokit = github.getInstance();

    const creatingGistStatus = new Spinner("Creating gist ...");
    creatingGistStatus.start();

    let filename = String(userFilename);
    let content = userContent;
    let descriptionVar = userDescription;
    let private = userPrivate;

    try {

        let files = {};

        files[filename] = {
            content: content
        }

        const response = await octokit.gists.create({
            files: files,
            description: descriptionVar,
            public: !private
        });

        return response.data.html_url;
    } catch (err) {
        throw err;
    } finally {
        creatingGistStatus.stop();
    }
}

module.exports = {
    createGist
}