const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const expressValidator = require('express-validator');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');




 /***
  * Create Express server
  */

 const app = express();


/**
 * Controllers (route handlers).
 */
 const api = require('./routes/api');



 /***
  * connect to mongodb 
  */
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true});
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  });
  mongoose.connection.on('open', function() {
    mongoose.connection.db.admin().serverStatus(function(error, info) {
      console.log("mongodb connected",info.version);
    });
  });

  /**
 * Express configuration.
 */  
  app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({
     extended: true
   }));
   
  
   
  /***
   * expresss static files setup
   */
   app.use(expressLayouts);
   app.set('view engine','ejs');
    app.set('port', process.env.PORT || 4000);
    app.use(helmet())
    app.use(compression());
    app.use(logger('dev'));
      app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
              "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    next();
  });

/**
 * API examples routes.
 */
 app.use('/api/v1', api);



/**
 * Start Express server.
 */
 app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
  module.exports = app;