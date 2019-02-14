# Politico [![Build Status](https://travis-ci.org/fridolinho/Politico.svg?branch=develop)](https://travis-ci.org/fridolinho/Politico) [![Coverage Status](https://coveralls.io/repos/github/fridolinho/Politico/badge.svg?branch=develop)](https://coveralls.io/github/fridolinho/Politico?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/c4104dd666dab7844b89/maintainability)](https://codeclimate.com/github/fridolinho/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c4104dd666dab7844b89/test_coverage)](https://codeclimate.com/github/fridolinho/Politico/test_coverage)
Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

## User Interface (UI)
* HTML
* CSS
* Javascript

### UI Link Example
[POLITICO link](https://fridolinho.github.io/Politico/)

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v1/offices | POST | Post to the collection of offices |
| /api/v1/offices | GET | Fetch all existing offices |
| /api/v1/offices/:id | GET | Fetch a specific office |
| /api/v1/parties | POST | Post a political party to the collections political parties |
| /api/v1/parties/ | GET | Fetch all existing parties  |
| /api/v1/parties/:id | GET | Fetch a specific party |
| /api/v1/parties/:id | PATCH | Update a specific party |
| /api/v1/parties/:id | DELETE | Delete a specific party |

## Tools Used

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Testing Framework
```
 *Mocha* and *Chai*
 ```
### Style Guide
```
*Airbnb*
```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### APP link Example

[heroku link](https://politico-fr.herokuapp.com/)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```


**Version 1.0.0**

## Contributor
- Fridolin NIYONSABA <fridolinho@gmail.com>

---

## License & copyright
Copyright (c) 2019 Fridolin Niyonsaba, Full-Stack developer
