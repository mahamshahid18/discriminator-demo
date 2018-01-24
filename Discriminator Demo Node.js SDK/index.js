'use strict';

const lib = require('./lib');

const controller = lib.APIController;

const promise = controller.getPerson();
promise.then((response) => {
    // this block will be executed on successful endpoint call
    // `response.body` will be of type 'Person'
    console.log();
    console.log('===================================================================');
    console.log('Default Behavior: Discrimator Values not set in server response');
    console.log('===================================================================');
    console.log(response);
    console.log('\n\n');
}, (err) => {
    // this block will be executed on endpoint call failure
    // `err` is an 'object' containing more information about the error
});

const promiseTwo = controller.getPersonWithDiscriminators();
promiseTwo.then((response) => {
    // this block will be executed on successful endpoint call
    // `response.body` will be of type 'Person'
    console.log('===================================================================');
    console.log('Discrimator Behavior: Discrimator Values set in server response');
    console.log('    Response sent from server is specified to be of type `Employee`');
    console.log('===================================================================');
    console.log(response);
    console.log('\n\n');
}, (err) => {
    // this block will be executed on endpoint call failure
    // `err` is an 'object' containing more information about the error
});
