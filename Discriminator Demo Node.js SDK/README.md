# Automatic Code Generation: Discriminators

This SDK has been generated through APIMatic's automatic code generation engine. I've worked extensively on this code generation engine during my time as a software engineer at APIMatic (I've worked on JavaScript SDK Generation). This SDK has been generated to consume a mock API that I created for a demo of "discriminators".

## What are discriminators?

To understand the concept of discriminators, please note the structure of the SDK.

![Structure](https://image.ibb.co/dxAmrw/structure.png)

The Models/CustomTypes present in an SDK are kind of helper datatypes that responses from the server can be deserialized into. Just like classes, CustomTypes can have inheritance relationship as well.  

Discriminator comes in handy when the response from a server can be deserialized into the parent as well as child classes. For example, in this demo, we have 3 CustomTypes: `Person`, `Employee`, `Boss`. `Person` model has two child models, `Employee` and `Boss`. It should technically be allowed for the server to return JSON response corresponding to the Person type itself or to any of its child classes i.e. Employee or Boss. Essentially, an _Employee_ or a _Boss_ is a *_Person_* as well.
APIMatic’s SDKs which support discriminator fields use the values of these fields to determine which class object to deserialize the server response into.

## How are discriminator values specified in JSON response?

Consider the following example JSON:

```
{
   "name":"SK",
   "age":5147483645,
   "address":"H # 531, S # 20",
   "birthday":"1994-02-13",
   "salary":20000,
   "department":"Software Development",
   "boss":{
      "name":"Obi-Wan",
      "age":5147483645,
      "address":"H # 531, S # 20",
      "birthday":"1994-02-13",
      "salary":20000,
      "department":"Software Development"
   }
}
```
This has no discriminators specified

Now, take a look at this one:

```
{
   "personType":"Empl",
   "name":"SK",
   "age":5147483645,
   "address":"H # 531, S # 20",
   "birthday":"1994-02-13",
   "salary":20000,
   "department":"Software Development",
   "boss":{
      "personType":"Boss",
      "name":"Obi-Wan",
      "age":5147483645,
      "address":"H # 531, S # 20",
      "birthday":"1994-02-13",
      "salary":20000,
      "department":"Software Development"
   }
}
```
> personType is the name of the discriminator field and its value `Empl` is an identifier for `Employee` class


In this case, the JSON object is specified to be of `Employee` type (*Empl* is the value used to identify Employee class). Whereas the boss object of the Employee is specified to be of `Boss` type. This is essentially how the server lets the SDK know what kind of response it is sending out. So that the SDK can deserialize it into the proper format accordingly.

## Discriminator Handling in SDK

For implementation purposes, you can take a look at [Person.js](https://github.com/mahamshahid18/discriminator-demo/blob/master/Discriminator%20Demo%20Node.js%20SDK/lib/Models/Person.js) Model class. It has a `discriminatorMap` function, which is inherited by all the child classes as well. It returns a mapping of discriminator identifier to CustomType name. This mapping is used by the mapping function to figure out which model class has to be instantiated.

Next, you can take a look at the [ObjectMapper](https://github.com/mahamshahid18/discriminator-demo/blob/master/Discriminator%20Demo%20Node.js%20SDK/lib/ObjectMapper.js) class. The purpose of this class is to map the JSON response fields (from the server) with the fields of the CustomType that is instantiated. It does this on the fly, first instantiating a CustomType and then going through all the fields of the JSON response, simultaneously matching them to the field names in the CustomType object and hence, populating the CustomType fields with their correct values (as returned by the server) [this is being done by the `mapFields` method]

The `mapFields` method is called by the `mapObject` method, within the ObjectMapper class. The mapObject method is passed the JSON response to be mapped, and the name of the class to be instantiated. It however, first checks if there is a discriminator already present in the class (whose name is passed in). If there is a discriminator field present in the CustomType (`getDiscriminatorFieldName()`) and its value has been set in the JSON response (`getDiscriminatorFieldValue()`), then the correct class is instantiated according to the discriminator value. If however, no discriminator is set, the default behavior occurs, and the default class is instantiated (whose name was passed in initally).

After this, the `mapFields` method iterates the fields of the newly instantiated model class (which have empty values by default) and populates their values with JSON response sent by server.

To briefly see how `mapObject` is called, you can take a look at [APIController.js](https://github.com/mahamshahid18/discriminator-demo/blob/master/Discriminator%20Demo%20Node.js%20SDK/lib/Controllers/APIController.js), line no `56`. Please note that the `ObjectMapper` class is not exposed through the client to be used by the devs. It is for internal working of the SDK only.

## Demo

To see a demo of this:

* Install Node.js if you don't have it already
* Run `npm install` to install dependencies
* Run `node index` to run the demo app

The demo app will make calls to 2 endpoints. One returns response without discriminator values (`/person`). The other sends response with discriminator values (`/personWithDiscriminator`). You can see the difference in the deserialized responses to get an idea of how the 2 have been manipulated.


## My Contribution

I have worked on the ObjectMapper class and discriminator support, figuring out the SDK design & implementation details on my own (with advice from my co-workers).

The documentation below has been automatically generated with the SDK, which I worked on for the JavaScript SDKs. If you want to see it in action, you can head on over to https://apimatic.io and generate an SDK by yourself. It requires an API description as input. You can use the one I've [built for this demo](https://github.com/mahamshahid18/discriminator-demo/blob/master/API%20description/discriminator-demo.json)


---------------------------------------------------------------------------------




# Getting Started with Discriminator Demo

A Mock API created for a demo of discriminator usage in automatically generated Node.js SDK.

## How to Build

The generated SDK relies on [Node Package Manager](https://www.npmjs.com/) (NPM) being available to resolve dependencies. If you don't already have NPM installed, please go ahead and follow instructions to install NPM from [here](https://nodejs.org/en/download/).

The SDK also requires Node to be installed. If Node isn't already installed, please install it from [here](https://nodejs.org/en/download/)

> NPM is installed by default when Node is installed

To check if node and npm have been successfully installed, write the following commands in command prompt:

* `node --version`

* `npm --version`

![Version Check](https://apidocs.io/illustration/nodejs?workspaceFolder=DiscriminatorDemo&step=versionCheck)

Now use npm to resolve all dependencies by running the following command in the root directory (of the SDK folder):

```bash
npm install
```

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?workspaceFolder=DiscriminatorDemo&step=resolveDependency1)

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?step=resolveDependency2)

This will install all dependencies in the `node_modules` folder.

Once dependencies are resolved, you will need to move the folder `lib` in to your `node_modules` folder.

## How to Use

The following section explains how to use the generated library in a new project.

### 1. Open Project Folder

Open an IDE/Text Editor for JavaScript like Sublime Text. The basic workflow presented here is also applicable if you prefer using a different editor or IDE.

Click on `File` and select `Open Folder`.

![Open Folder](https://apidocs.io/illustration/nodejs?step=openFolder)

Select the folder of your SDK and click on `Select Folder` to open it up in Sublime Text. The folder will become visible in the bar on the left.

![Open Project](https://apidocs.io/illustration/nodejs?workspaceFolder=DiscriminatorDemo&step=openProject)

### 2. Creating a Test File

Now right click on the folder name and select the `New File` option to create a new test file. Save it as `index.js`.

![Create new file](https://apidocs.io/illustration/nodejs?workspaceFolder=DiscriminatorDemo&step=createNewFile)

Now import the generated NodeJS library using the following lines of code:

```
const lib = require('lib');
```

Save changes.

Your `index.js` file should look like this now

![Save new file](https://apidocs.io/illustration/nodejs?workspaceFolder=DiscriminatorDemo&step=saveNewFile)

### 3. Running The Test File

To run the `index.js` file, open up the command prompt and navigate to the Path where the SDK folder resides. Type the following command to run the file:

```
node index.js
```

![Run file](https://apidocs.io/illustration/nodejs?workspaceFolder=DiscriminatorDemo&step=runProject)

## How to Test

These tests use Mocha framework for testing, coupled with Chai for assertions. These dependencies need to be installed for tests to run. Tests can be run in a number of ways:

### Method 1 - Run all tests

1. Navigate to the root directory of the SDK folder from command prompt. `(PathToSDK/DiscriminatorDemo/)`

2. Type `mocha --recursive` to run all the tests.

### Method 2 - Run all tests

1. Navigate to the `PathToSDK/DiscriminatorDemo/test/Controllers/` directory from command prompt.

2. Type `mocha *` to run all the tests.

### Method 3 - Run specific controller's tests

1. Navigate to the `PathToSDK/DiscriminatorDemo/test/Controllers/` directory from command prompt.

2. Type `mocha DiscriminatorDemoController` to run all the tests in that controller file.

> To increase mocha's default timeout, you can change the `TEST_TIMEOUT` parameter's value in `TestBootstrap.js`.

![Run Tests](https://apidocs.io/illustration/nodejs?controllername=DiscriminatorDemoController&workspacefolder=DiscriminatorDemo&step=runTests)

## Initializing

The API client can be initialized as following.

```js
const lib = require('lib');
const configuration = lib.Configuration;

```


## Authorizing your client

This API doesn't use any authentication.


## API Reference

### List of APIs

* [APIController](#apicontroller)

### `APIController`

#### Get singleton instance

The singleton instance of the `APIController` class can be accessed from the API Client.

```
const lib = require('lib');
const controller = lib.APIController;
```

#### `getPersonWithDiscriminators`

```js
getPersonWithDiscriminators()
```

##### Response Type

[`Person`](#person)

##### Example Usage

```js
const promise = controller.getPersonWithDiscriminators();
promise.then((response) => {
    // this block will be executed on successful endpoint call
    // `response.body` will be of type 'Person'
}, (err) => {
    // this block will be executed on endpoint call failure
    // `err` is an 'object' containing more information about the error
});
```

#### `getPerson`

```js
getPerson()
```

##### Response Type

[`Person`](#person)

##### Example Usage

```js
const promise = controller.getPerson();
promise.then((response) => {
    // this block will be executed on successful endpoint call
    // `response.body` will be of type 'Person'
}, (err) => {
    // this block will be executed on endpoint call failure
    // `err` is an 'object' containing more information about the error
});
```

## Model Reference

### Structures

* [`Employee`](#employee)
* [`Boss`](#boss)
* [`Person`](#person)

#### `Employee`

##### Inherits From

[`Person`](#person)

##### Fields

| Name | Type | Tags | Description |
|  --- | --- | --- | --- |
| `department` | `string` |  | - |
| `dependents` | [`array`](#person) |  | - |
| `salary` | `int` |  | - |
| `boss` | [`Person`](#person) | Optional | - |

##### Example (as JSON)

```json
{
  "department": "department0",
  "dependents": [
    {
      "address": "address3",
      "age": 45,
      "birthday": "2016-03-13",
      "name": "name7",
      "personType": null
    },
    {
      "address": "address4",
      "age": 46,
      "birthday": "2016-03-13",
      "name": "name8",
      "personType": null
    },
    {
      "address": "address5",
      "age": 47,
      "birthday": "2016-03-13",
      "name": "name9",
      "personType": null
    }
  ],
  "salary": 176,
  "boss": null,
  "address": "address6",
  "age": 250,
  "birthday": "2016-03-13",
  "name": "name0",
  "personType": null
}
```

#### `Boss`

Testing circular reference.

##### Inherits From

[`Employee`](#employee)

##### Fields

| Name | Type | Tags | Description |
|  --- | --- | --- | --- |
| `promotedAt` | `dateTime` |  | - |
| `assistant` | [`Employee`](#employee) | Optional | - |

##### Example (as JSON)

```json
{
  "promotedAt": 1480809600,
  "assistant": null,
  "department": "department0",
  "dependents": [
    {
      "address": "address3",
      "age": 45,
      "birthday": "2016-03-13",
      "name": "name7",
      "personType": null
    },
    {
      "address": "address4",
      "age": 46,
      "birthday": "2016-03-13",
      "name": "name8",
      "personType": null
    },
    {
      "address": "address5",
      "age": 47,
      "birthday": "2016-03-13",
      "name": "name9",
      "personType": null
    }
  ],
  "salary": 176,
  "boss": null,
  "address": "address6",
  "age": 250,
  "birthday": "2016-03-13",
  "name": "name0",
  "personType": null
}
```

#### `Person`

##### Fields

| Name | Type | Tags | Description |
|  --- | --- | --- | --- |
| `address` | `string` |  | - |
| `age` | `long` |  | - |
| `birthday` | `date` |  | - |
| `name` | `string` |  | - |
| `personType` | `string` | Optional | - |

##### Example (as JSON)

```json
{
  "address": "address6",
  "age": 250,
  "birthday": "2016-03-13",
  "name": "name0",
  "personType": null
}
```