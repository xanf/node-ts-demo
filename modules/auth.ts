/**
 * @author Illya Klymov
 */
import * as express from 'express';
import * as debugFn from 'debug';
import * as jwt from 'jsonwebtoken';
import { RequestError } from '../helpers/errors';
import { db, secretKey } from '../config';

const debug = debugFn('ts:auth');
const auth = express();

auth.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  const user = <User>db.getCollection('users').by('email', email );
  if (user && user.password === password) {
    res.json({
      token: jwt.sign({ email: user.email }, secretKey)
    });
  } else {
    throw new RequestError(401, 'Not authorized');
  }
});

auth.post('/requestreset', () => {});
auth.post('/reset', () => {});
auth.post('/logout', () => {});

export function isRevoked(req: express.Request, payload: Object, done: Function) {
  console.log(payload);
  done();
}

export default auth;

