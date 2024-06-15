import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

const app = express();
const port = 3001;

// Configura il DataSource
const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ristorante',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

// Inizializza il DataSource
AppDataSource.initialize().then(() => {
  console.log('Connected to the database');

  app.get('/', async (req, res) => {
    const users = await AppDataSource.manager.find(User);
    res.json(users);
  });

  app.listen(port, () => {
    console.log('Server is running at http://localhost:' + port);
  });
}).catch(error => console.log(error));