# Introduction

Application is made with **Node** using **TypeScript**, **Express** and **SQLite** as a database.
<br>

Ideas for improvement are inside the code commented with the label **_// TODO:_**

## Installation

**You need to seed a database to initialize the project with following script:**

```bash
  npm run seed
```

run project on **development** environment:

```bash
  npm run dev
```

compile **typescript** to **javascript**:

```bash
  npm run build
```

run server on **production**:

```bash
  npm run start
```

## API Reference

Info about possible routes inside `route` folder in `README.md` file.

## Running Tests

Application is tested with [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest)

#### IMPORTANT!

To run tests, you will need to add the following environment variables to your `.env` file:

`JWT_SECRET`

`TEST_DATABASE`

and then run the following command:

```bash
  npm run test
```

### Test coverage

You can see the test coverage table directly inside the console after running test script or in browser by opening `index.html` inside automatically generated folder - `coverage`

## Environment Variables

**For demo purpose .env file is included to GitHub repository**
<br>

To run this project, you will need to add the following environment variables to your `.env` file.

`JWT_SECRET`

`DATABASE`

`TEST_DATABASE`
