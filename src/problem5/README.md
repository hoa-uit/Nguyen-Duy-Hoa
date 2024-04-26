# books-service

## Table of Contents

Service was inspired by [Onion architecture](https://dev.to/jnavez/make-your-microservices-tastier-by-cooking-them-with-a-sweet-onion-34n2)

-   [CRUD-service](#books-service)
    -   [Table of Contents](#table-of-contents)
    -   [How to run](#how-to-run)
    -   [Architecture and Design](#architecture-and-design)
    -   [Codebase Structure](#codebase-structure)
        -   [Naming convention](#naming-convention)
        -   [Structure](#structure)
            -   [`src > controller`](#src--controller)
            -   [`src > application`](#src--application)
            -   [`src > config`](#src--config)
            -   [`src > domain`](#src--domain)
            -   [`src > common`](#src--common)
            -   [`src > repository`](#src--repository)
    -   [Building and Development](#building-and-development)
    -   [Testing](#testing)
    -   [Logger](#logger)

## How to run

**PREREQUISITE**: **docker and nodejs should be existing in your device and make sure your in problem5 directory**

Installing dependencies:

```bash
yarn
```

Prepare dependencies:

-   Create Books database and feeding data

```bash
yarn start:dependencies
```

-   Create env file:

```bash
cp .env.example .env
```

Start server:

```bash
yarn start:dev
```

Healthcheck call:

```bash
curl --localtion --request GET 'http://localhost:8080/health'
```

Please reference to `src/problem5/api/book.v1.swagger.yaml` to see apis documentation

Hey dude, i also put postman collection in `src/problem5/api/postman-collection`. Enjoy ^.^

## Architecture and Design

-   implement the component diagram for [TBU]()
-   class component diagram: [TBU]()

## Codebase Structure

### Naming convention:

-   Folder name: use dash-case name, e.g. `datasource-service`
-   File name: use camelCase name,

### Structure

| Name                | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| dist                | contains the distributable from TvpeScrint build                                    |
| docker              | contains docker file to define for dependecy service                                |
| node_modules        | Contains all npm dependencies                                                       |
| output              | contains report and coverage for unit tests                                         |
| src                 | contain main logic for service                                                      |
| ** test **          | Folder for unit testing purpose                                                     |
| jest.config.ts      | used to config jest                                                                 |
| package.json        | file to control and mange npm dependency                                            |
| tsconfig.json       | Config setting for compiling server code written in TypeScript when develop         |
| tsconfig.build.json | config settings for compiling server code written in TypeScript when build artiract |

#### `src > controller`:

-   Code for REST API endpoint specific logic:
    -   `handlers > v1` : API v1 handler

### `src > application` :

-   Contain main business logic (all biz logic should be contralized in here)

###`src > config` :

-   Configiguration for service

### `Src > domain`:

-

### `src > common`:

-   Code for common utility logics.
-   Should NOT be aware of business.

### `src > repository`:

-   Reposotories wrap any call to other services: database

Make request:

```http
POST http://localhost:8080/v1/books
```

## Testing

We use Jest as our test framework. To execute all the test run `yarn test`

Note this will also generate a coverage report

## loggger:

we use winston for logging.
Standard loggings can be found:
