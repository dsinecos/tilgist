#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./inquirer.js');
const github = require('./github.js');
const gist = require('./gist.js');
const CLI = require('clui');
const Spinner = CLI.Spinner;

const tilnotes = require('commander');

console.log(
    chalk.yellow(
        figlet.textSync('TILNotes', { horizontalLayout: 'full' })
    )
);

tilnotes
    .version('0.1.0')
    .option('-p, --private', 'to create a private gist')
    .arguments('<filename> <content> [description] ')
    .action(createCLIGist)

tilnotes
    .command('open')
    .description('add content for the gist using a terminal editor. The editor can be specified using the `-e` or `--editor` flag. If no editor is specified, the editor to use is determined by reading the $VISUAL or $EDITOR environment variables. If neither of those are present, notepad (on Windows) or vim (Linux or Mac) is used.')
    .action(createEditorGist)

tilnotes.parse(process.argv);

if (tilnotes.args.length === 0) {
    tilnotes.help();
}
// clear();

async function intializeGithubCredentials() {

    let token = github.getStoredGithubToken();

    if (!token) {
        await github.setGithubCredentials();
        token = await github.registerNewToken();
    }

    let octokit = github.getInstance();

    octokit.authenticate({
        type: 'oauth',
        token: token
    });

    return token;
}

async function createCLIGist(filename, content, description) {
    let token = await intializeGithubCredentials();
    let private = Boolean(tilnotes.private);

    try {
        let gistUrl = await gist.createGist(filename, content, description, private);
        console.log("Gist created @ ", gistUrl);
    } catch (err) {
        console.log(err);
    }
}

async function createEditorGist() {
    const token = await intializeGithubCredentials();

    // Setup editor as Nano
    if (!process.env.EDITOR) {
        process.env.EDITOR = "nano";
    }

    console.log("Inside createEditorGist");

    try {
        console.log("Inside try block");
        var gistData = await inquirer.askGistDetails();
        console.log("Got the gist details");
        console.log(JSON.stringify(gistData, null, "  "));
    } catch (err) {
        console.log("Inside error");
        console.log(err);
    }

    let private = Boolean(tilnotes.private);

    try {
        let gistUrl = await gist.createGist(gistData.filename, gistData.content, gistData.description, private);
        console.log("Gist created @ ", gistUrl);
    } catch (err) {
        console.log(err)
    }

}