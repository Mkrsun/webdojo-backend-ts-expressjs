import { MysqlPoolRO, MysqlPoolRW } from "./mysql.pool";
import { DbRepository } from "../dbRepository";
import { InternalServerError } from "../../error";

class MysqlRepository implements DbRepository {
  executeQueryRO = async (query: string, values?: any[]): Promise<any> => {
    try {
      let result;
      if (values) {
        [result] = await MysqlPoolRO.query(query, values);
      } else {
        [result] = await MysqlPoolRO.query(query);
      }
      return result;
    } catch (error) {
      throw new InternalServerError(
        "Error interno del servidor - pool request failed"
      );
    }
  };

  public async executeQueryRW(query: string, values: any[]): Promise<any> {
    try {
      const [result] = await MysqlPoolRW.query(query, values);
      return result;
    } catch (error) {
      throw new InternalServerError(
        "Error interno del servidor - pool request failed"
      );
    }
  }
}

export default MysqlRepository;
