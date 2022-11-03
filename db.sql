-- Future usage
CREATE TABLE favlist(
  movieId string
  movieTitle VARCHAR(255), string
  userEmail unique relation to other table login email 
);

-- Heroku + render
-- CREATE TABLE login(
--   id serial PRIMARY KEY,
--   hash VARCHAR(100) NOT NULL,
--   username VARCHAR(100),
--   email text UNIQUE NOT NULL
-- );

-- CREATE TABLE users(
--   id serial PRIMARY KEY,
--   username VARCHAR(100),
--   email text UNIQUE NOT NULL
-- );

-- Railway
-- CREATE TABLE login(
--   id serial PRIMARY KEY,
--   hash text NOT NULL,
--   username text,
--   email text UNIQUE
-- );

-- CREATE TABLE users(
--   id serial PRIMARY KEY,
--   username text,
--   email text UNIQUE
-- );

-- Note: there's no VARCHAR in railway, use text instead