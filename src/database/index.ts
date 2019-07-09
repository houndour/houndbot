import logger from '../utils/logger';
import { Dialect } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';

const databaseLoader = async () => {
  try {
    const sequelize = new Sequelize({
      dialect: <Dialect>process.env.DB_DIALECT,
      database: <string>process.env.DB_NAME,
      username: <string>process.env.DB_USER,
      host: <string>process.env.DB_HOST,
      password: <string>process.env.DB_PASSWORD,
      modelPaths: [__dirname + '/../models'],
      logging: JSON.parse(<string>process.env.DEBUG),
      storage: __dirname + '/../../database.sqlite'
    });
    await sequelize.sync();

    logger('database', `Loaded database successfully!`, 'info');
  } catch (err) {
    logger('database', `Error while loading database config (Error: ${err.message} / ${err.stack})!`, 'error');
  }
};

export default databaseLoader;
