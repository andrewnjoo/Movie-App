# express-server

### Description:

This is an Express server that uses Typescript, Prisma, Jest, and Supertest. It consumes the TMDB API v3.

### Tech:

- Express 4.x
- Typescript 4.x
- Prisma 4.x
- Jest 29.x
- Supertest 6.x

### External APIs consumed:

- TMDB API v3

### Quick start:

To get started, run the following command:

```
npm run setup
```

This command will install all dependencies, generate database migrations and seed test data.

After the setup has been done, you can start the server by running:

```
npm run start
```

### Running tests:

To run the tests, use the command

```
npm run test
```

This will run all the tests in the ./src folder.

### Generate code coverage report:

To generate a code coverage report, use the command

```
npm run test:coverage
```

### Configuration:

The server requires a .env file to be created with the following environment variable set:

```
DATABASE_URL="mysql://root:@localhost:3306/express_db"
JWT_SECRET=abc123
SALT_ROUNDS=10
```

Make sure to replace root with your MySQL username and express_db with the name of your database.
