import express from 'express';
import bodyParser from 'body-parser';
import party from './routes/party';
import office from './routes/office';
import user from './routes/user';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/v1/parties', party);
app.use('/api/v1/offices', office);
app.use('/api/v1/auth', user);

app.get('/', (req, res) => {
  res.send('Welcome to Politico app');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
export default app;
