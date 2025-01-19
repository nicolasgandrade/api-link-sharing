import cors from 'cors';
import express from 'express';
import { engine } from 'express-handlebars';
import { auth } from 'express-oauth2-jwt-bearer';
import path from 'path';
import 'reflect-metadata';
import { AppDataSource } from './infra/db/datasource';
import router from './infra/router';
import ssrRouter from './ssr/router';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: process.env.AUTH0_TOKEN_ALG,
});

app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'https://nicolasgandrade.github.io',
      'https://app-enderlinks.nicolasgandrade.com',
    ],
  })
);
app.use('/api', jwtCheck);
app.use(express.json());

app.set('views', __dirname + '/ssr/views');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.use('/api', router());
app.use('', ssrRouter());

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, HOST);
  })
  .catch((err) => {
    console.log(err);
  });
