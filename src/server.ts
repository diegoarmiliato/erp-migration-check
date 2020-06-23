import express from 'express';
import '@controllers/UsersController';
import { Connect } from '@database/Connect';
import dotenv from 'dotenv';
dotenv.config();

const server: express.Application = express();

const port: number = parseInt(process.env.SERVER_PORT!) || 8000;

const connect: Connect = new Connect();

server.get('/connectTest', (req, res) => {
  (async () => {
    // Opens Database Connection
    const conn = await connect.open();
    //
    const query = conn.queryStream("SELECT * FROM SFW_SISTEMA_VERSAO WHERE VALIDO = 'S' AND COD_SISTEMA = 9");
    //
    query.on('data', (data) => {
      console.log(data);
    });
    // //
    res.send('Server Up');
  })();
});

server.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

server.listen(port, () => {
  console.log(`Listening on port ${port} !!!`);
});
