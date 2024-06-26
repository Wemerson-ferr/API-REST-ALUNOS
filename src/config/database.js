require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
