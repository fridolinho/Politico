import 'babel-polyfill';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerDocument from '../swagger.json';
import party from './routes/party';
import office from './routes/office';
import user from './routes/user';
import vote from './routes/vote';
import petition from './routes/petition';

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/v1/parties', party);
app.use('/api/v1/offices', office);
app.use('/api/v1/auth', user);
app.use('/api/v1/votes', vote);
app.use('/api/v1/petition', petition);

app.get('/', (req, res) => {
  res.send('Welcome to Politico app');
});

app.all('/*', (req, res) => {
  res.status(404).send('not found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
export default app;
