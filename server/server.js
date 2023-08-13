const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const port = process.env.PORT;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

console.log(DB_USER)

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
}) 

connection.connect()

const getPokemonInfoQuery = `
    SELECT 
        P.pokedexId,
        P.generation,
        P.category,
        P.name_fr,
        P.name_en,
        T1.type_name AS type_1_name,
        T2.type_name AS type_2_name,
        Ta1.talent_name AS talent_1_name,
        Ta2.talent_name AS talent_2_name,
        Ta3.talent_name AS talent_3_name,
        P.hp,
        P.atk,
        P.def,
        P.spe_atk,
        P.spe_def,
        P.vit,
        P.height,
        P.weight,
        P.stade
    FROM
        PokeGuess.Pokemon AS P
    LEFT JOIN
        PokeGuess.Types AS T1 ON P.type_1 = T1.type_id
    LEFT JOIN
        PokeGuess.Types AS T2 ON P.type_2 = T2.type_id
    LEFT JOIN
        PokeGuess.Talents AS Ta1 ON P.talent_1 = Ta1.talent_id
    LEFT JOIN
        PokeGuess.Talents AS Ta2 ON P.talent_2 = Ta2.talent_id
    LEFT JOIN
        PokeGuess.Talents AS Ta3 ON P.talent_3 = Ta3.talent_id
;
`;

connection.query(getPokemonInfoQuery, (err, rows, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return; 
    }
  
    console.log('The solution is:');
    rows.forEach((row) => {
      console.log(row);
    });
  });

app.get('/api/users', (req, res) => {
    res.json({ "users": ["axel", "garance"]})
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

connection.end()