// createMigration.mjs
import { exec } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';
import { helperPaths } from '../knexHelper.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcPath = __filename.replace('scripts/createMigration.mjs', '');
const migrationTemplatePath = srcPath + helperPaths.migrationTemplateDir;

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return reject(error);
      }
      console.log(`${stdout}`);
      resolve(stdout);
    });
  });
};

const createMigration = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'migrationName',
        message: '¿Cuál es el nombre de tu nueva migración?',
        validate: (input) => input && input.trim() !== '',
      },
    ]);

    const migrationCommand = `npx knex migrate:make ${answers.migrationName}`;
    const stdout = await execPromise(migrationCommand);
    const match = stdout.match(/Migration:\s(.*\.js)/);
    if (!match) {
      throw new Error(
        'No se pudo conseguir la nueva migracion creada para su configuracion',
      );
    }

    const migrationFileName = match[1];
    const migrationNameWithTimeStamp = path.basename(migrationFileName, '.js');

    const migrationTemplateContent = await fs.readFile(
      migrationTemplatePath,
      'utf-8',
    );

    const sqlFileRelativePathUp = `./sql/${migrationNameWithTimeStamp}-up.sql`;
    const sqlFileRelativePathDown = `./sql/${migrationNameWithTimeStamp}-down.sql`;

    const adaptedContent = migrationTemplateContent
      .replace(
        '//import-sql-path-up',
        `const sqlPathUp = '${sqlFileRelativePathUp}';`,
      )
      .replace(
        '//import-sql-path-down',
        `const sqlPathDown = '${sqlFileRelativePathDown}';`,
      );

    const relativeBaseToMigration = '../db/migrations/';
    const relativeMigrationFilePath =
      relativeBaseToMigration + migrationNameWithTimeStamp + '.js';

    const relativePathToMigrationFinal = path.resolve(
      __dirname,
      relativeMigrationFilePath,
    );

    await fs.writeFile(relativePathToMigrationFinal, adaptedContent);

    const relativePathForSqlUp =
      relativeBaseToMigration +
      '/sql' +
      `/${migrationNameWithTimeStamp}-up.sql`;

    const relativePathToSqlFileUpResolve = path.resolve(
      __dirname,
      relativePathForSqlUp,
    );

    const relativePathForSqlDown =
      relativeBaseToMigration +
      '/sql' +
      `/${migrationNameWithTimeStamp}-down.sql`;

    const relativePathToSqlFileDownResolve = path.resolve(
      __dirname,
      relativePathForSqlDown,
    );

    await fs.writeFile(
      relativePathToSqlFileUpResolve,
      '-- Aquí va el SQL de la migración UP\n',
    );
    await fs.writeFile(
      relativePathToSqlFileDownResolve,
      '-- Aquí va el SQL de la migración DOWN\n',
    );
  } catch (error) {
    console.error(`Error al ejecutar la migración: ${error}`);
  }
};

createMigration();
