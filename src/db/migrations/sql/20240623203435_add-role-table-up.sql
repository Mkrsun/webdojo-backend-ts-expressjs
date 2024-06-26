-- Aquí va el SQL de la migración UP
-- Crear la tabla role
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);