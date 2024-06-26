-- Aquí va el SQL de la migración UP
-- Crear la tabla profile_role
CREATE TABLE profile_role (
  profileId INT NOT NULL,
  roleId INT NOT NULL,
  CONSTRAINT fk_profileId FOREIGN KEY (profileId) REFERENCES profile(id),
  CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES role(id),
  PRIMARY KEY (profileId, roleId)
);
