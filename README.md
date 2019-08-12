[![CircleCI](https://circleci.com/gh/Gidraff/cheat-sheet-api.svg?style=svg)](https://circleci.com/gh/Gidraff/cheat-sheet-api)[![Coverage Status](https://coveralls.io/repos/github/Gidraff/cheat-sheet-api/badge.svg)](https://coveralls.io/github/Gidraff/cheat-sheet-api)
# cheat-sheet-api

Cheat Sheet API allows you to to CRUD operations by exposing the following endpoints:

| Endpoints        | Methods|Operation           |  Public access  |
| ------------- |:-------------| -----|----------|
| /api/user/register      | POST | Register a new user| true
| /api/user/login     | POST      |   Log in user| true
|  /user/cheats | POST      | create a new cheat sheet   | false
|  /user/cheats | GET      | fetch all cheat sheets   | false
|  /user/cheats/:cheatId | GET      |  fetch a single cheat sheet   | false
|  /user/cheats/:cheatId | PUT      |  edit cheat sheet with the argument passed   | false
|  /user/cheats/:cheatId | DELETE      |  delete cheat sheet with the argument passed   | false

## Prerequisite
To run this Application locally, you will need the following installed:
- Nodejs v10.10.0 
- npm v6.4.1
- MongoDB v4.0.2


## Installation

Git clone to get a copy of the application on your laptop.

```bash
git clone https://github.com/Gidraff/cheat-sheet-api.git
```

Run `cd cheat-sheet-api` to change directory.

To install application dependencies, run:
```bash
npm install
```

To create a `.env` file run:
```bash
mv .env.sample .env
```
NOTE: Replace the values in `.env` with your own values

## Running Test:
Run unit test to make sure nothing has broken. Make sure mongo daemon is running

```bash
npm test
```

## Running App:
Before running the application, make sure you replace `db url string` with a running mongodb instance or use the local mongodb.

```bash
npm start
```

## Author
Gidraff(me)
