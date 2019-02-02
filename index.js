import express from 'express';
import party from './views/party';

const app = express();
app.use(express.json());

app.use('/api/v1/parties', party);

app.get('/', (req, res) => {
	res.send('Welcome to Politico app');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
export default app;