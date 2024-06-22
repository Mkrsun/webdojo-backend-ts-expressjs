import { DbRepository } from "./dbRepository";
import MysqlRepository from "./mysql/mysql.repository.impl";

const dbRepositoryInstance: DbRepository = new MysqlRepository();

export { dbRepositoryInstance };
