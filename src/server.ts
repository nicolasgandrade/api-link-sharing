import cors from 'cors';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import 'reflect-metadata';
import { AppDataSource } from './infra/db/datasource';
import router from './infra/router';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: process.env.AUTH0_TOKEN_ALG,
});

app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(jwtCheck);
app.use(express.json());

app.use('/api', router());
app.get('/ping', (_, res) => {
  res.send('pong');
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, HOST);
  })
  .catch((err) => {
    console.log(err);
  });
