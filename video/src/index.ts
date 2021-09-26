import 'dotenv-safe/config'
import express, { Application } from 'express';
import ngrok from 'ngrok';
import { routes } from './routes';

const app: Application = express();
app.use(routes)

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`),
);

ngrok.connect(parseInt(process.env.PORT, 0)).then((url) => {
  console.log(`Server forwarded to public url ${url}`);
});