const schedule = require("node-schedule");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const dbConnection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});


function job(){
  schedule.scheduleJob("0 0 * * *", () => {
    const randomIdClassic = Math.floor(Math.random() * 1010) + 1;
    const randomIdShadow = Math.floor(Math.random() * 1010) + 1;
    const randomIdShiny = Math.floor(Math.random() * 1010) + 1;

    const insertQueryClassic = `
      INSERT INTO PokeGuess.ClassicDaily (id, Daily)
      VALUES (?, ?);
    `;
    const insertQueryShadow = `
      INSERT INTO PokeGuess.ShadowDaily (id, Daily)
      VALUES (?, ?);
    `;
    const insertQueryShiny = `
      INSERT INTO PokeGuess.ShinyDaily (id, Daily)
      VALUES (?, ?);
    `;

    const insertValues = [randomIdClassic, currentDate];

    dbConnection.query(insertQueryClassic, insertValues, (err, results) => {
      if (err) {
      } else {
        insertValues[0] = randomIdShadow;

        dbConnection.query(insertQueryShadow, insertValues, (err, results) => {
          if (err) {
          } else {
            insertValues[0] = randomIdShiny;

            dbConnection.query(insertQueryShiny, insertValues, (err, results) => {
              if (err) {
              } else {
                const successMessage = `Inserted data into daily tables on ${currentDate}\n\tpokemon classic : ${randomIdClassic}\n\tpokemon shadow : ${randomIdShadow}\n\tpokemon hard : ${randomIdShiny}\n`;
              }
            });
          }
        });
      }
    });
  });
}

module.exports = { job };
