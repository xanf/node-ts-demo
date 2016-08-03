/**
 * @author Illya Klymov
 */
/// <reference path="typings/index.d.ts" />

import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { RequestError } from './helpers/errors';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new RequestError('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err: RequestError, req: express.Request, res: express.Response) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: RequestError, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
