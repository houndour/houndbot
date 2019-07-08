import log4js from 'log4js';

/**
 * Configure logger, append text in console and save to file.
 * Docs about log4js: https://log4js-node.github.io/log4js-node/
 */
log4js.configure({
  appenders: {
    file: { type: 'file', layout: { type: 'basic' }, filename: `logs/hound.log` },
    console: { type: 'console' }
  },
  categories: { default: { appenders: ['file', 'console'], level: 'info' } }
});

/**
 * Get logger instance and export as function.
 * Usage: logger(moduleName (string), message (string), type (string)).
 * Allowed types: trace, debug, info, warn, error, fatal.
 */
const loggerInstance = log4js.getLogger('[HOUND]');
export default (moduleName: string, msg: string, type: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal') => loggerInstance[type](`[${moduleName}] ${msg}`);
