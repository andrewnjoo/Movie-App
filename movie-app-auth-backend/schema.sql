-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS movie_database;

-- Create the db
CREATE DATABASE movie_database;

-- Move into the db
\c movie_database 

--Users Table Schema
--Create User ID Extension | universally unique identifier
CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO
    users (user_name, user_email, user_password)
VALUES
    ('bob', 'bob@gmail.com', 'password'),
    ('cindy', 'cindy@gmail.com', 'password');

-- Movies Table Schema
CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  user_id VARCHAR(255)
);

INSERT INTO
  movies (name, user_id)
VALUES
  ('Star Wars Episode 1 Phantom Menace', 'c4f881ed-68f0-4ffb-b7bb-61024159e518'),
  ('The Matrix', 'c4f881ed-68f0-4ffb-b7bb-61024159e518'),
  ('Shawshank Redemption', 'c4f881ed-68f0-4ffb-b7bb-61024159e518'),
  ('Soul', 'c4f881ed-68f0-4ffb-b7bb-61024159e518'),
  ('Finding Nemo', 'c4f881ed-68f0-4ffb-b7bb-61024159e518'),
  ('Inside Out', 'c4f881ed-68f0-4ffb-b7bb-61024159e518'),
  ('Gladiator', 'c4f881ed-68f0-4ffb-b7bb-61024159e518');
