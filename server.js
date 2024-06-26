import Sequelize from 'sequelize';
import app from './app';

import databaseConfig from './src/config/database';

const connection = new Sequelize(databaseConfig);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`Acesse http://localhost:${port}`);
});

async function testeconect() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testeconect();
