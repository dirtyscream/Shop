import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import routes from './app/routers/routers';

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.options('*', cors());

app.use('/', routes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));