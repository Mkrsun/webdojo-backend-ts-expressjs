-- Aquí va el SQL de la migración UP
-- Crear la tabla skill
CREATE TABLE skill (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);