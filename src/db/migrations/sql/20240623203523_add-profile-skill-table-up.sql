-- Aquí va el SQL de la migración UP
-- Crear la tabla profile_skill
CREATE TABLE profile_skill (
  profileId INT NOT NULL,
  skillId INT NOT NULL,
  CONSTRAINT fk_profile FOREIGN KEY (profileId) REFERENCES profile(id),
  CONSTRAINT fk_skill FOREIGN KEY (skillId) REFERENCES skill(id),
  PRIMARY KEY (profileId, skillId)
);