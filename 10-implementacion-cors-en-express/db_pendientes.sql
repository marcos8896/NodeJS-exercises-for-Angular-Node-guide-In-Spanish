CREATE DATABASE db_pendientes;
USE db_pendientes;
-- INNODB permite utilizar transacciones en MySQL
SET default_storage_engine=INNODB;
CREATE TABLE pendientes (
    pendiente_id INT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(1000),
    estado VARCHAR(50),
    PRIMARY KEY (pendiente_id)
);
