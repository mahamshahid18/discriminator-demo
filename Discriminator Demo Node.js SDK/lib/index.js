/**
  * @module DiscriminatorDemoLib
  *
  * asda
  */

'use strict';

const Configuration = require('./configuration');
const APIController = require('./Controllers/APIController');
const Employee = require('./Models/Employee');
const Boss = require('./Models/Boss');
const Person = require('./Models/Person');
const APIException = require('./Exceptions/APIException');


const initializer = {
    // functional components of DiscriminatorDemoLib
    Configuration,
    // controllers of DiscriminatorDemoLib
    APIController,
    // models of DiscriminatorDemoLib
    Employee,
    Boss,
    Person,
    // exceptions of DiscriminatorDemoLib
    APIException,
};

module.exports = initializer;
