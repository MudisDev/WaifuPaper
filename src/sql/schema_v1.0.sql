-- Active: 1703272465031@@127.0.0.1@3306@waifupaper
CREATE DATABASE WaifuPaper;

USE WaifuPaper;

SHOW TABLES;

SHOW DATABASES;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    genero VARCHAR(20) DEFAULT NULL,
    telefono VARCHAR(10) DEFAULT NULL UNIQUE,
    foto_perfil TEXT DEFAULT NULL
);

/* ALTER TABLE Usuario ADD UNIQUE (telefono);

ALTER TABLE Usuario DROP INDEX telefono; */

CREATE TABLE Etiqueta (
    id_etiqueta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Autor (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    url_perfil TEXT NOT NULL
);

CREATE TABLE Modelo_Base (
    id_modelo_base INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    descripcion TEXT NOT NULL,
    credito_autor BOOLEAN NOT NULL,
    url TEXT NOT NULL,
    imagen_referencia TEXT NOT NULL,
    id_autor INT NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES Autor (id_autor)
);

CREATE TABLE Imagen (
    id_imagen INT AUTO_INCREMENT PRIMARY KEY,
    url TEXT NOT NULL,
    semilla TEXT NOT NULL,
    imagen_listada BOOLEAN DEFAULT NULL,
    id_modelo_base INT NOT NULL,
    fecha_insercion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_modelo_base) REFERENCES Modelo_Base (id_modelo_base)
);

CREATE TABLE Favorito (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_imagen INT NOT NULL,
    fecha_favorito DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_imagen) REFERENCES Imagen (id_imagen) ON DELETE CASCADE
);

CREATE TABLE Tiene_Etiqueta (
    id_imagen INT NOT NULL,
    id_etiqueta INT NOT NULL,
    PRIMARY KEY (id_imagen, id_etiqueta),
    FOREIGN KEY (id_imagen) REFERENCES Imagen (id_imagen) ON DELETE CASCADE,
    FOREIGN KEY (id_etiqueta) REFERENCES Etiqueta (id_etiqueta) ON DELETE CASCADE
);

CREATE TABLE Especie (
    id_especie INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE Personalidad (
    id_personalidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE Personaje (
    id_personaje INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    alias VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    historia TEXT NOT NULL,
    pasatiempo TEXT NOT NULL,
    ocupacion VARCHAR(40) NOT NULL,
    dia INT NOT NULL,
    mes INT NOT NULL,
    edad INT NOT NULL,
    id_especie INT NOT NULL,
    imagen_perfil TEXT NOT NULL,
    FOREIGN KEY (id_especie) REFERENCES Especie (id_especie)
);

CREATE TABLE Tiene_Personalidad (
    id_personaje INT NOT NULL,
    id_personalidad INT NOT NULL,
    PRIMARY KEY (id_personaje, id_personalidad),
    FOREIGN KEY (id_personaje) REFERENCES Personaje (id_personaje) ON DELETE CASCADE,
    FOREIGN KEY (id_personalidad) REFERENCES Personalidad (id_personalidad) ON DELETE CASCADE
);

CREATE TABLE Aparece_En (
    id_imagen INT NOT NULL,
    id_personaje INT NOT NULL,
    PRIMARY KEY (id_imagen, id_personaje),
    FOREIGN KEY (id_imagen) REFERENCES Imagen (id_imagen) ON DELETE CASCADE,
    FOREIGN KEY (id_personaje) REFERENCES Personaje (id_personaje) ON DELETE CASCADE
);

CREATE TABLE Modelo_Lora (
    id_modelo_lora INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    descripcion TEXT NOT NULL,
    credito_autor BOOLEAN NOT NULL,
    url TEXT NOT NULL,
    imagen_referencia TEXT NOT NULL,
    id_autor INT NOT NULL,
    id_modelo_base INT NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES Autor (id_autor),
    FOREIGN KEY (id_modelo_base) REFERENCES Modelo_Base (id_modelo_base)
);

CREATE TABLE Usa_Modelo_Lora (
    id_imagen INT NOT NULL,
    id_modelo_lora INT NOT NULL,
    prompt TEXT NOT NULL,
    fuerza DECIMAL(3,1) NOT NULL,
    PRIMARY KEY (id_imagen, id_modelo_lora),
    FOREIGN KEY (id_imagen) REFERENCES Imagen (id_imagen) ON DELETE CASCADE,
    FOREIGN KEY (id_modelo_lora) REFERENCES Modelo_Lora (id_modelo_lora) ON DELETE CASCADE
);

SHOW TABLES;

DROP DATABASE WaifuPaper;

SELECT * FROM personaje;
SELECT * FROM etiqueta;
SELECT * FROM imagen;

/* DROP TABLE usuario;

DROP TABLE etiqueta;

DROP TABLE imagen;

DROP Table favorito;

DROP Table tiene_etiqueta;

SELECT * FROM usuario;

SELECT * FROM etiqueta;

SELECT * FROM imagen;

SELECT * FROM tiene_etiqueta;

SELECT * FROM favorito;

DELETE FROM imagen;

DELETE FROM tiene_etiqueta;

DELETE FROM favorito;

CREATE VIEW Vista_Tiene_Etiqueta AS
SELECT te.id_imagen, te.id_etiqueta, e.nombre AS nombre_etiqueta
FROM tiene_etiqueta te
    JOIN etiqueta e ON te.id_etiqueta = e.id_etiqueta;

CREATE VIEW Vista_Mostrar_Imagen_Por_Etiqueta AS
SELECT
    te.id_imagen AS id_imagen_etiqueta,
    te.id_etiqueta,
    i.url,
    i.id_imagen AS id_imagen_real,
    i.clasificacion
FROM tiene_etiqueta te
    JOIN imagen i ON te.id_imagen = i.id_imagen;

CREATE VIEW Vista_Favorito AS
SELECT f.id_favorito, f.id_usuario, f.id_imagen, f.fecha_favorito, i.url AS url, i.clasificacion
FROM favorito f
    JOIN imagen i ON f.id_imagen = i.id_imagen;

SHOW TABLES;

SELECT * FROM vista_tiene_etiqueta;

SELECT * FROM vista_favorito;

SELECT * FROM vista_mostrar_imagen_por_etiqueta;

DROP VIEW vista_tiene_etiqueta;

DROP VIEW vista_mostrar_imagen_por_etiqueta;

DROP VIEW vista_favorito;

SELECT * FROM etiqueta;

CREATE VIEW Vista_Imagenes_Sin_Negativas AS
SELECT i.*
FROM imagen i
WHERE
    i.clasificacion = 'safe'
    AND i.id_imagen NOT IN(
        SELECT te.id_imagen
        FROM tiene_etiqueta te
            JOIN etiqueta e ON te.id_etiqueta = e.id_etiqueta
        WHERE
            e.lista_negra = 1
    );

CREATE VIEW Vista_Mostrar_Imagen_Por_Etiqueta_Segura AS
SELECT
    te.id_imagen,
    te.id_etiqueta,
    i.url,
    i.id_imagen AS id_imagen_real,
    i.clasificacion,
    i.artista,
    i.api_origen,
    i.id_imagen_api,
    i.url_fuente,
    i.fecha_insercion,
    i.fecha_actualizacion
FROM
    tiene_etiqueta te
    JOIN Vista_Imagenes_Sin_Negativas i ON te.id_imagen = i.id_imagen; */