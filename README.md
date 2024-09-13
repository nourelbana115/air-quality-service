
# Air Quality
Node.js, Express.js web server to fetch air quality from IQAIR API, in this project i demonstrate how to integrate with third party using axios in express.js, create a cron job runs every minute with express.js schedule.

### Dependencies  
-   [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/5x/api.html)
- [Mongoose](https://mongoosejs.com/)

## Running the app in production mode
Note: please setup environment variables file so the application work properly i have pushed my env file so you can test it easy

- import ```Air Quality.postman_collection.json``` to postman
## Running the Node App in development mode

- set ```.env``` file with environment variables needed
- API_KEY: the api key of your account at IQAIR
- MONGO_URI: MongoDB connection string

```bash
# development mode to run Node.js application
$ npm install
$ npm run awesome
```
## Unit Test

```bash
# use this command to run unit test
$ npm run test
$ jest --coverage
```
