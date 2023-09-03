const express = require('express');
const dotenv = require('dotenv');
const pokedexRoute = require('./routes/pokedex');
const cron = require('./cron');
const cors = require('cors'); 

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://pokeguess.fun', // Remplacez par votre domaine front-end
  methods: 'GET,HEAD',
};

app.use(cors(corsOptions)); // Utilisation du middleware CORS

app.use('/api', pokedexRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

cron.job();
