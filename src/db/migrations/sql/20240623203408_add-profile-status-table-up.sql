-- Aquí va el SQL de la migración UP
-- Crear la tabla profile_status
CREATE TABLE profile_status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);