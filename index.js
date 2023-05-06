require('dotenv').config();
const express = require('express');
const flightRouter = require('./routes/flight');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.use('/', flightRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Arrancando en el puerto ${port}!`);
});
