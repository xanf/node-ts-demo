/**
 * @author Illya Klymov
 */
import * as loki from 'lokijs';
const {
  SECRET_KEY,
  DB_FILE,
  SAVE_INTERVAL
} = process.env;

const secretKey = SECRET_KEY || 'test';
const db = new loki(DB_FILE || './loki.json', {
  autosave: true,
  autosaveInterval: SAVE_INTERVAL ? +SAVE_INTERVAL : 1000,
  autoload: true
});

export { secretKey, db };


