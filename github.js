const octokit = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg = require('./package.json');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

const inquirer = require('./inquirer');

const conf = new Configstore(pkg.name);

function getInstance() {
    return octokit;
}

function getStoredGithubToken() {
    return conf.get('github.token');
}

async function setGithubCredentials() {
    const credentials = await inquirer.askGithubCredentials();
    octokit.authenticate(
        _.extend(
            {
                type: 'basic'
            },
            credentials
        )
    );
}

async function registerNewToken() {
    const status = new Spinner('Authenticating user, please wait...');
    status.start();

    try {
        const response = await octokit.authorization.create({
            scopes: ['gist'],
            note: ['TILNotes, command line tool for taking notes']
        })

        const token = response.data.token;

        if (token) {
            conf.set('github.token', token);
            return token;
        } else {
            throw new Error('Missing Token', 'Github token was not found in the response');
        }
    } catch (err) {
        throw err;
    } finally {
        status.stop();
    }
}

module.exports = {
    getInstance,
    getStoredGithubToken,
    setGithubCredentials,
    registerNewToken
}