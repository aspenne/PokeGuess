-- Creation Types Table 
CREATE Table PokeGuess.Types (
    type_id INT PRIMARY KEY,
    type_name VARCHAR(255)
);

-- Création de la Table Talents
CREATE Table PokeGuess.Talents (
    talent_id INT PRIMARY KEY,
    talent_name VARCHAR(255)
);

-- Creation Pokemon Table
CREATE Table PokeGuess.Pokemon (
    pokedexId INT PRIMARY KEY,
    generation INT,
    category VARCHAR(255),
    name_fr VARCHAR(255),
    name_en VARCHAR(255),
    type_1 INT,
    type_2 INT,
    talent_1 INT,
    talent_2 INT,
    talent_3 INT,
    hp INT,
    atk INT,
    def INT,
    spe_atk INT,
    spe_def INT,
    vit INT,
    height Decimal(6,1),
    weight Decimal(4,1),
    stade INT,
	FOREIGN KEY FK_Type_Pokemon_type_1 (type_1) REFERENCES Types(type_id),
    FOREIGN KEY FK_Type_Pokemon_type_2 (type_2) REFERENCES Types(type_id),
    FOREIGN KEY FK_Talent_Pokemon_talent_1 (talent_1) REFERENCES Talents(talent_id),
    FOREIGN KEY FK_Talent_Pokemon_talent_2 (talent_2) REFERENCES Talents(talent_id),
    FOREIGN KEY FK_Talent_Pokemon_talent_3 (talent_3) REFERENCES Talents(talent_id)
);


-- Creation Evolution Table
CREATE Table PokeGuess.Evolutions(
    pokedexId INT,
    pre_pokedexId INT,
    next_pokedexId INT,
    Mega_evolution BOOLEAN,
    condition_evolution VARCHAR(255),
    FOREIGN KEY FK_Evolution_Pokemon_pokedexId (pokedexId) REFERENCES PokeGuess.Pokemon(pokedexId),
    FOREIGN KEY FK_Evolution_Pokemon_pre (pre_pokedexId) REFERENCES PokeGuess.Pokemon(pokedexId),
    FOREIGN KEY FK_Evolution_Pokemon_next (next_pokedexId) REFERENCES PokeGuess.Pokemon(pokedexId)
);

-- Create Classic Daily Table
CREATE Table PokeGuess.ClassicDaily(
    id INT PRIMARY KEY,
    Daily Date,
    FOREIGN KEY FK_ClassicDaily_Pokemon_pokedexId (id) REFERENCES PokeGuess.Pokemon(pokedexId)
);

-- Create Shadow Daily Table
CREATE Table PokeGuess.ShadowDaily(
    id INT PRIMARY KEY,
    Daily Date,
    FOREIGN KEY FK_ShadowDaily_Pokemon_pokedexId (id) REFERENCES PokeGuess.Pokemon(pokedexId)
);

-- Create Shiny Daily Table
CREATE Table PokeGuess.ShinyDaily(
    id INT PRIMARY KEY,
    Daily Date,
    FOREIGN KEY FK_ShinyDaily_Pokemon_pokedexId (id) REFERENCES PokeGuess.Pokemon(pokedexId)
);
