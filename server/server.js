const express = require('express');
const dotenv = require('dotenv');
const pokedexRoute = require('./routes/pokedex');
const cron = require('./cron')

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use('/api', pokedexRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

cron.job();