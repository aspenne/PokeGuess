const { Router } = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");

const router = Router();
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

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
        u697843051_PokeGuess.Pokemon AS P
    LEFT JOIN
        u697843051_PokeGuess.Types AS T1 ON P.type_1 = T1.type_id
    LEFT JOIN
        u697843051_PokeGuess.Types AS T2 ON P.type_2 = T2.type_id
    LEFT JOIN
        u697843051_PokeGuess.Talents AS Ta1 ON P.talent_1 = Ta1.talent_id
    LEFT JOIN
        u697843051_PokeGuess.Talents AS Ta2 ON P.talent_2 = Ta2.talent_id
    LEFT JOIN
        u697843051_PokeGuess.Talents AS Ta3 ON P.talent_3 = Ta3.talent_id
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
        u697843051_PokeGuess.Pokemon AS P
    LEFT JOIN
        u697843051_PokeGuess.Types AS T1 ON P.type_1 = T1.type_id
    LEFT JOIN
        u697843051_PokeGuess.Types AS T2 ON P.type_2 = T2.type_id
    LEFT JOIN
        u697843051_PokeGuess.Talents AS Ta1 ON P.talent_1 = Ta1.talent_id
    LEFT JOIN
        u697843051_PokeGuess.Talents AS Ta2 ON P.talent_2 = Ta2.talent_id
    LEFT JOIN
        u697843051_PokeGuess.Talents AS Ta3 ON P.talent_3 = Ta3.talent_id
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
      P.pokedexId,
      P.hp,
      P.atk,
      P.def,
      P.spe_atk,
      P.spe_def,
      P.vit,
      P.stade,
      P.generation
  FROM
      u697843051_PokeGuess.Pokemon AS P
  LEFT JOIN
      u697843051_PokeGuess.Types AS T1 ON P.type_1 = T1.type_id
  LEFT JOIN
      u697843051_PokeGuess.Types AS T2 ON P.type_2 = T2.type_id
  LEFT JOIN
      u697843051_PokeGuess.Talents AS Ta1 ON P.talent_1 = Ta1.talent_id
  LEFT JOIN
      u697843051_PokeGuess.Talents AS Ta2 ON P.talent_2 = Ta2.talent_id
  LEFT JOIN
      u697843051_PokeGuess.Talents AS Ta3 ON P.talent_3 = Ta3.talent_id
  WHERE
      P.pokedexId = ?
`;

const getPokemonShadowById = `
  SELECT 
      P.pokedexId,
      P.name_fr,
      P.name_en
  FROM
      u697843051_PokeGuess.Pokemon AS P
  WHERE
      P.pokedexId = ?
`;


const getEvolutionById = `
  SELECT 
    E.pre_pokedexId, 
    E.next_pokedexId, 
    E.condition_evolution 
  FROM 
    u697843051_PokeGuess.Evolutions as E
  WHERE 
    E.PokedexId = ?
`;

const getNameById = `
  SELECT 
    P.name_fr
  FROM 
    u697843051_PokeGuess.Pokemon as P
  WHERE 
    P.PokedexId = ?
`;

const getClassicPkmn = `
  SELECT 
    *,
    T1.type_name AS type_1_name,
    T2.type_name AS type_2_name,
    Ta1.talent_name AS talent_1_name,
    Ta2.talent_name AS talent_2_name,
    Ta3.talent_name AS talent_3_name
  FROM 
    u697843051_PokeGuess.ClassicDaily AS Cd
  Inner JOIN
    u697843051_PokeGuess.Pokemon AS P ON P.pokedexId = Cd.id
  LEFT JOIN
    u697843051_PokeGuess.Types AS T1 ON P.type_1 = T1.type_id
  LEFT JOIN
    u697843051_PokeGuess.Types AS T2 ON P.type_2 = T2.type_id
  LEFT JOIN
    u697843051_PokeGuess.Talents AS Ta1 ON P.talent_1 = Ta1.talent_id
  LEFT JOIN
    u697843051_PokeGuess.Talents AS Ta2 ON P.talent_2 = Ta2.talent_id
  LEFT JOIN
    u697843051_PokeGuess.Talents AS Ta3 ON P.talent_3 = Ta3.talent_id
  ORDER BY 
    daily DESC
  LIMIT 1;
`;

const getShadowPkmn = `
  SELECT 
    *
  FROM 
    u697843051_PokeGuess.ShadowDaily
  ORDER BY 
    daily DESC
  LIMIT 1;
`;

const getShinyPkmn = `
  SELECT 
    *,
    T1.type_name AS type_1_name,
    T2.type_name AS type_2_name,
    Ta1.talent_name AS talent_1_name,
    Ta2.talent_name AS talent_2_name,
    Ta3.talent_name AS talent_3_name
  FROM 
    u697843051_PokeGuess.ShinyDaily AS Sd
  Inner JOIN
    u697843051_PokeGuess.Pokemon AS P ON P.pokedexId = Sd.id
  LEFT JOIN
    u697843051_PokeGuess.Types AS T1 ON P.type_1 = T1.type_id
  LEFT JOIN
    u697843051_PokeGuess.Types AS T2 ON P.type_2 = T2.type_id
  LEFT JOIN
    u697843051_PokeGuess.Talents AS Ta1 ON P.talent_1 = Ta1.talent_id
  LEFT JOIN
    u697843051_PokeGuess.Talents AS Ta2 ON P.talent_2 = Ta2.talent_id
  LEFT JOIN
    u697843051_PokeGuess.Talents AS Ta3 ON P.talent_3 = Ta3.talent_id
  ORDER BY 
    daily DESC
  LIMIT 1;
`;



router.get("/Pkmns", (req, res) => {
  connection.query(getPokemonsInfoQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query Pkmns:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/PkmnClassic", (req, res) => {
  connection.query(getPokemonsInfoQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query PkmnClassic:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/PkmnClassicDaily", (req, res) => {
  connection.query(getClassicPkmn, (err, results, fields) => {
    if (err) {
      console.error("Error executing query PkmnClassicDaily:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/PkmnShadowDaily", (req, res) => {
  connection.query(getShadowPkmn, (err, results, fields) => {
    if (err) {
      console.error("Error executing query PkmnShadowDaily:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/PkmnShinyDaily", (req, res) => {
  connection.query(getShinyPkmn, (err, results, fields) => {
    if (err) {
      console.error("Error executing query PkmnShinyDaily:", err);
      return;
    }
    res.json(results);
  });
});

router.get("/PkmnsIdName", (req, res) => {
  connection.query('SELECT pokedexId, name_fr, name_en From u697843051_PokeGuess.Pokemon', (err, results, fields) => {
    if (err) {
      console.error("Error executing query PkmnsIdName:", err);
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
        console.error("Error executing query Pkmn/:id:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }
      res.json(results);
    }
  );
});

router.get("/Evolution/:id", (req, res) => {
  const { id } = req.params;
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 1010) {
    return res.status(404).json({ error: "Invalid Pokémon ID" });
  }

  connection.query(
    getEvolutionById,
    [pokemonId],
    (err, results, fields) => {
      if (err) {
        console.error("Error executing query Evolution/:id:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }
      res.json(results);
    }
  );
});

router.get("/PkmnName/:id", (req, res) => {
  const { id } = req.params;
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 1010) {
    return res.status(404).json({ error: "Invalid Pokémon ID" });
  }

  connection.query(
    getNameById,
    [pokemonId],
    (err, results, fields) => {
      if (err) {
        console.error("Error executing query PkmnName/:id:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }
      res.json(results);
    }
  );
});

router.get("/PkmnClassic/:id", (req, res) => {
  const { id } = req.params;
  const pokemonId = parseInt(id);

  connection.query(
    getPokemonClassicById,
    [pokemonId],
    (err, results, fields) => {
      if (err) {
        console.error("Error executing query PkmnClassic/:id:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }
      res.json(results);
    }
  );
});

router.get("/PkmnShadow/:id", (req, res) => {
  const { id } = req.params;
  const pokemonId = parseInt(id);

  connection.query(
    getPokemonShadowById,
    [pokemonId],
    (err, results, fields) => {
      if (err) {
        console.error("Error executing query PkmnShadow/:id:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }
      res.json(results);
    }
  );
});


module.exports = router;
