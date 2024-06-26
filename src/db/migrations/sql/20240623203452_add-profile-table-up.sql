-- Crear la tabla profile con claves foráneas a accountId y currentStatus que no pueden ser nulos
CREATE TABLE profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  accountId INT NOT NULL,
  name VARCHAR(32),
  lastname VARCHAR(32),
  profilePicture VARCHAR(255),
  countryCode VARCHAR(10),
  bio TEXT,
  experienceLevel ENUM('Entry level', 'Junior', 'Semi Senior', 'Senior', 'Expert') DEFAULT 'Entry level',
  linkedinProfile VARCHAR(255),
  githubProfile VARCHAR(255),
  portfolioUrl VARCHAR(255),
  currentStatus INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_account FOREIGN KEY (accountId) REFERENCES account(id),
  CONSTRAINT fk_status FOREIGN KEY (currentStatus) REFERENCES profile_status(id)
);
