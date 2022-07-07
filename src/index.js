#!/usr/bin/env node

// Copyright (c) 2022 Joshua Schmitt
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { program } = require('commander');
const packagejson = require('../package.json');
const fs = require('node:fs');
const { exec } = require('node:child_process');
const wait = require('wait');


program
  .name('checkpm')
  .description('A npm package to check and fix the package manager in a project.')
  .version(packagejson.version);


program.command('yarn')
    .description('Check and set the project to yarn.')
    .option('-c, --clean', 'Clean the project before setting it to Yarn.', false)
    .action((options) => {
        fs.readdirSync(process.cwd()).forEach(async file => {
            if(file == "package-lock.json" || file == "pnpm-lock.yaml") {
                console.log(`Found ${file}. Removing...`);
                const doCleanup = options.clean;

                await wait(2000);
                fs.rmSync(file);

                if(doCleanup) {
                    console.log('Cleaning up...');
                    await wait(2000);
                    fs.rm(`${process.cwd()}/node_modules`, { recursive: true, force: true }, function(err) {
                        if(err) console.log('error', err);
                        console.log('Cleanup complete.');
                    });
                }


                exec('yarn install', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    } else if (stderr) {
                        console.error(stderr);
                        return;
                    }
                    console.log(stdout);
                });
            };
        });

        return;
    });


program.command('npm')
    .description('Check and set the project to pnpm.')
    .option('-c, --clean', 'Clean the project before setting it to npm.', false)
    .action((options) => {
        fs.readdirSync(process.cwd()).forEach(async file => {
            if(file == "yarn.lock" || file == "pnpm-lock.yaml") {
                console.log(`Found ${file}. Removing...`);
                const doCleanup = options.clean;

                await wait(2000);
                fs.rmSync(file);

                if(doCleanup) {
                    console.log('Cleaning up...');
                    await wait(2000);
                    fs.rm(`${process.cwd()}/node_modules`, { recursive: true, force: true }, function(err) {
                        if(err) console.log('error', err);
                        console.log('Cleanup complete.');
                    });
                }


                exec('npm install', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    } else if (stderr) {
                        console.error(stderr);
                        return;
                    }
                    console.log(stdout);
                });
            };
        });

        return;
    });

    
program.command('pnpm')
    .description('Check and set the project to npm.')
    .option('-c, --clean', 'Clean the project before setting it to npm.', false)
    .action((options) => {
        fs.readdirSync(process.cwd()).forEach(async file => {
            if(file == "package-lock.json" || file == "pnpm-lock.yaml") {
                console.log(`Found ${file}. Removing...`);
                const doCleanup = options.clean;

                await wait(2000);
                fs.rmSync(file);

                if(doCleanup) {
                    console.log('Cleaning up...');
                    await wait(2000);
                    fs.rm(`${process.cwd()}/node_modules`, { recursive: true, force: true }, function(err) {
                        if(err) console.log('error', err);
                        console.log('Cleanup complete.');
                    });
                }


                exec('pnpm install', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    } else if (stderr) {
                        console.error(stderr);
                        return;
                    }
                    console.log(stdout);
                });
            };
        });

        return;
    });

program.parse();