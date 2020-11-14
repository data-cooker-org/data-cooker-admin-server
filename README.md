# Data-Cooker Admin Server

## Setup development environment from boilerplate

```sh
# clone repository
git clone https://github.com/data-cooker-org/data-cooker-admin-server.git admin-server

# cd into project root
cd admin-server

# install dependencies
npm i

# load test data
npm seed

# start application
npm start
```


## Setup developmen environment from scratch

mkdir admin-server
cd admin-server
git init
npm init -y
touch README.md

package.json
```
{
  "name": "data-cooker-admin-server",
  "version": "1.0.0",
  "description": "Backend of the data-cooker admin UI",
  "keywords": [
    "data processing"
  ],
  "author": "data.consultant@data-cooker.org",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/data-cooker-org/data-cooker-admin-server"
  },
  "homepage": "https://github.com/data-cooker-org/data-cooker-admin-server#readme",
  "bugs": {
    "url": "https://github.com/data-cooker-org/data-cooker-admin-server/issues"
  },
  "scripts": {
    "project": "node ./scripts/index.js",
    "dev": "cross-env NODE_ENV=development node ./api/api.js",
    "create-sqlite-db": "shx touch ./db/database.sqlite",
    "drop-sqlite-db": "shx rm ./db/database.sqlite",
    "lint": "eslint ./api/. ./config/. ./test/.",
    "prestart": "npm run create-sqlite-db",
    "start": "npm run nodemon",
    "nodemon": "nodemon --exec npm run dev",
    "prepush": "npm test; npm run drop-sqlite-db; npm run create-sqlite-db",
    "pretest": "npm run lint",
    "production": "cross-env NODE_ENV=production node ./api/api.js",
    "seed": "cross-env DB_ENABLE_LOGGING=true node './seed'",
    "test": "cross-env NODE_ENV=testing jest --coverage",
    "test-ci": "jest --coverage --forceExit"
  },
  "jest": {
    "globals": {
      "__DEV__": true
    },
    "testEnvironment": "node",
    "testPathIgnorePatterns": [
      "/node_modules/"
    ]
  },
  "dependencies": {
    "apollo-server-express": "^2.18.2",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.2",
    "core-js": "^2.6.5",
    "cors": "^2.8.5",
    "express": "^4.16.4",
    "express-routes-mapper": "^1.1.0",
    "express-validator": "^6.6.1",
    "graphql": "^14.0.2",
    "helmet": "^3.15.0",
    "jsonwebtoken": "^8.4.0",
    "lodash.merge": "^4.6.1",
    "morgan": "^1.10.0",
    "node-schedule": "^1.3.2",
    "promise.prototype.finally": "^3.1.2",
    "sequelize": "^5.21.9",
    "sqlite3": "^4.2.0",
    "taskz": "^3.0.0"
  },
  "devDependencies": {
    "cross-env": "^5.2.1",
    "eslint": "^5.9.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.14.0",
    "fs-extra": "^7.0.1",
    "husky": "^1.2.0",
    "jest": "^24.8.0",
    "nodemon": "^1.18.6",
    "sequelize-auto": "^0.7.1",
    "shx": "^0.3.2",
    "supertest": "^3.3.0",
    "yargs": "^12.0.5"
  }
}
```

(copy all code files in to project forder)
mpm i
npm run seed
npm run start


