DROP TABLE IF EXISTS usertable;
CREATE TABLE IF NOT EXISTS usertable (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL

);


DROP TABLE IF EXISTS schedtable;
CREATE TABLE IF NOT EXISTS schedtable (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usertable(id),
    day INTEGER NOT NULL CHECK(day >= 1 AND day <=7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);

