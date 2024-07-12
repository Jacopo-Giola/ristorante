import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Sezione } from './entity/Sezione';
import { Piatto } from './entity/Piatto';
import authRoutes from './routes/Auth';
import sezioniRoutes from './routes/Sezioni';
import piattiRoutes from './routes/Piatti';
import cors from 'cors';

const app = express();
const port = 3001;

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ristorante',
  synchronize: true,
  logging: false,
  entities: [User, Sezione, Piatto],
  migrations: [],
  subscribers: [],
});

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.use('/auth', authRoutes);
    app.use('/piatti', piattiRoutes);
    app.use('/sezioni', sezioniRoutes);

    app.listen(port, () => {
      console.log('Server is running at http://localhost:' + port);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });

export default AppDataSource;