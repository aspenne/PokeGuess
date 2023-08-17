const { Router } = require("express");
const dotenv = require("dotenv");

const router = Router();
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

connection.connect();

const getPokemonsInfoQuery = `
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
`;

const getPokemonInfoQueryById = `
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
    WHERE
        P.pokedexId = ?
  `;

  const getPokemonClassicById = `
  SELECT 
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
      P.stade,
      P.generation
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
  WHERE
      P.pokedexId = ?
`;

router.get("/Pkmns", (req, res) => {
  connection.query(getPokemonsInfoQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/PkmnClassic", (req, res) => {
  connection.query(getPokemonsInfoQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/PkmnsIdName", (req, res) => {
  connection.query('SELECT pokedexId, name_fr, name_en From PokeGuess.Pokemon', (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/Pkmn/:id", (req, res) => {
  const { id } = req.params;
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 1010) {
    return res.status(404).json({ error: "Invalid Pokémon ID" });
  }

  connection.query(
    getPokemonInfoQueryById,
    [pokemonId],
    (err, results, fields) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }
      res.json(results);
    }
  );
});

router.get("/PkmnsClassic/:id", (req, res) => {
  const { id } = req.params;
  const pokemonId = parseInt(id);

  connection.query(
    getPokemonClassicById,
    [pokemonId],
    (err, results, fields) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }
      res.json(results);
    }
  );
});


module.exports = router;
