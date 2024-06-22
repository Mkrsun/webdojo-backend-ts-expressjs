import { MysqlPoolRO, MysqlPoolRW } from "./mysql.pool";
import { DbRepository } from "../dbRepository";
import { InternalServerError } from "../../error";

class MysqlRepository implements DbRepository {
  escapeQuery = (query: string): string => {
    return query
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .replaceAll("*", "")
      .replaceAll(";", "");
  };
  executeQueryRO = async (query: string, values?: any[]): Promise<any> => {
    try {
      const escapedQuery = this.escapeQuery(query);
      let result;
      if (values) {
        [result] = await MysqlPoolRO.query(escapedQuery, values);
      } else {
        [result] = await MysqlPoolRO.query(escapedQuery);
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
      const escapedQuery = this.escapeQuery(query);
      const [result] = await MysqlPoolRW.query(escapedQuery, values);
      return result;
    } catch (error) {
      throw new InternalServerError(
        "Error interno del servidor - pool request failed"
      );
    }
  }
}

export default MysqlRepository;
