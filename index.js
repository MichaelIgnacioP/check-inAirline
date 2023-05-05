const express = require('express');
const flightRouter = require('./routes/flight');

const app = express();

app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});


app.use('/', flightRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Arrancando en el puerto ${port}!`);
});
