import express from 'express';
import router from './infra/router';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());
app.use('/api', router());

app.get('/', (_, res) => {
  res.send('API works');
});

app.listen(PORT, HOST);
