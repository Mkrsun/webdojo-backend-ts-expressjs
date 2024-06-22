import inquirer from 'inquirer';
import path from 'path';
import { helperPaths } from '../knexHelper.mjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcPath = __filename.replace('scripts/createSeed.mjs', '');
const seedTemplatePath = srcPath + helperPaths.seedTemplateDir;

const createSeed = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'seedName',
        message: '¿Cuál es el nombre de tu nuevo seed?',
        validate: (input) => input && input.trim() !== '',
      },
    ]);

    const seedFileName = answers.seedName;
    const today = new Date()
      .toISOString()
      .split('.')[0]
      .replace('T', '')
      .replaceAll('-', '')
      .replaceAll(':', '');
    const seedNameWithTimeStamp = `${today}_${path.basename(seedFileName, '.js').toLowerCase()}`;

    const seedTemplateContent = await fs.readFile(seedTemplatePath, 'utf-8');

    const sqlFileRelativePathUp = `./sql/${seedNameWithTimeStamp}-up.sql`;

    const adaptedContent = seedTemplateContent.replace(
      '//import-sql-path-up',
      `const sqlPathUp = '${sqlFileRelativePathUp}';`,
    );

    const relativeBaseToSeed = '../db/seeds/';
    const relativeSeedFilePath =
      relativeBaseToSeed + seedNameWithTimeStamp + '.js';

    const relativePathToSeedFinal = path.resolve(
      __dirname,
      relativeSeedFilePath,
    );

    await fs.writeFile(relativePathToSeedFinal, adaptedContent);

    const relativePathForSqlUp =
      relativeBaseToSeed + '/sql' + `/${seedNameWithTimeStamp}-up.sql`;

    const relativePathToSqlFileUpResolve = path.resolve(
      __dirname,
      relativePathForSqlUp,
    );

    await fs.writeFile(
      relativePathToSqlFileUpResolve,
      '-- Aquí va el SQL de la seed\n',
    );
  } catch (error) {
    console.error(`Error al ejecutar el seed: ${error}`);
  }
};

createSeed();
