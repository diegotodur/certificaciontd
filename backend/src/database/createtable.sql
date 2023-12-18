-- Lineas de codigo para crear la tabla de usuarios para autentificación en la base de datos;

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    createAt TIMESTAMP NOT NULL,
);