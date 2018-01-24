/**
 * DiscriminatorDemoLib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io )
 */

'use strict';

const BaseModel = require('./BaseModel');

/**
 * Creates an instance of Person
 */
class Person extends BaseModel {
    /**
     * @constructor
     * @param   {Object}  obj    The object passed to constructor
     */
    constructor(obj) {
        super(obj);
        if (obj === undefined || obj === null) return;
        this.address = this.constructor.getValue(obj.address);
        this.age = this.constructor.getValue(obj.age);
        this.birthday = this.constructor.getValue(obj.birthday);
        this.name = this.constructor.getValue(obj.name);
        this.personType = this.constructor.getValue(obj.personType);
    }

    /**
     * Function containing information about the fields of this model
     * @return   {array}   Array of objects containing information about the fields
     */
    static mappingInfo() {
        return super.mappingInfo().concat([
            { name: 'address', realName: 'address' },
            { name: 'age', realName: 'age' },
            { name: 'birthday', realName: 'birthday', isDateTime: true, dateTimeValue: 'date' },
            { name: 'name', realName: 'name' },
            { name: 'personType', realName: 'personType', isDiscrim: true },
        ]);
    }

    /**
     * Function containing information about discriminator values
     * mapped with their corresponding model class names
     *
     * @return   {object}  Object containing Key-Value pairs mapping discriminator
     *                     values with their corresponding model classes
     */
    static discriminatorMap() {
        return {
            Per: 'Person',
            Empl: 'Employee',
            Boss: 'Boss',
        };
    }
}

module.exports = Person;