-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bd_torneo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_torneo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS bd_torneo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE bd_torneo ;

-- -----------------------------------------------------
-- Table bd_torneo.equipos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bd_torneo.equipos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id (id ASC) VISIBLE,
  UNIQUE INDEX nombre_UNIQUE (nombre ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table bd_torneo.usuarios
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bd_torneo.usuarios (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  username VARCHAR(10) NOT NULL,
  password VARCHAR(10) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id (id ASC) VISIBLE,
  UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE,
  UNIQUE INDEX correo_UNIQUE (correo ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table bd_torneo.partidos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bd_torneo.partidos (
  id BIGINT NOT NULL AUTO_INCREMENT,
  usuario BIGINT UNSIGNED NOT NULL,
  local BIGINT UNSIGNED NOT NULL,
  visitante BIGINT UNSIGNED NOT NULL,
  fecha DATE NULL DEFAULT NULL,
  goles_local INT NULL DEFAULT NULL,
  goles_visitante INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX uk_unique1 USING BTREE (local, visitante, fecha) VISIBLE,
  INDEX fk_usuario (usuario ASC) VISIBLE,
  INDEX fk_visitante (visitante ASC) VISIBLE,
  CONSTRAINT fk_local
    FOREIGN KEY (local)
    REFERENCES bd_torneo.equipos (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT fk_usuario
    FOREIGN KEY (usuario)
    REFERENCES bd_torneo.usuarios (id),
  CONSTRAINT fk_visitante
    FOREIGN KEY (visitante)
    REFERENCES bd_torneo.equipos (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE bd_torneo ;

-- -----------------------------------------------------
-- Placeholder table for view bd_torneo.v_resultados
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bd_torneo.v_resultados (fecha INT, idPartido INT, id INT, usuario INT, local INT, goles_local INT, visitante INT, goles_visitante INT);

-- -----------------------------------------------------
-- View bd_torneo.v_resultados
-- -----------------------------------------------------
DROP TABLE IF EXISTS bd_torneo.v_resultados;
USE bd_torneo;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=root@localhost SQL SECURITY DEFINER VIEW bd_torneo.v_resultados AS select p.fecha AS fecha,p.id AS idPartido,u.id AS id,u.nombre AS usuario,el.nombre AS local,p.goles_local AS goles_local,ev.nombre AS visitante,p.goles_visitante AS goles_visitante from (((bd_torneo.partidos p join bd_torneo.usuarios u on((p.usuario = u.id))) join bd_torneo.equipos el on((p.local = el.id))) join bd_torneo.equipos ev on((p.visitante = ev.id))) order by p.fecha desc;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
