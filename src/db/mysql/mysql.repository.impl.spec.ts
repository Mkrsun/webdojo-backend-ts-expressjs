import { MysqlPoolRO, MysqlPoolRW } from "./mysql.pool";
import MysqlRepository from "./mysql.repository.impl";
import { InternalServerError } from "../../error";

jest.mock("./mysql.pool");

describe("MysqlRepository", () => {
  let mysqlRepository: MysqlRepository;

  beforeEach(() => {
    mysqlRepository = new MysqlRepository();
    jest.clearAllMocks();
  });

  describe("escapeQuery", () => {
    it("should escape the query correctly", () => {
      const query = "SELECT * FROM users;\n\t";
      const escapedQuery = mysqlRepository.escapeQuery(query);
      expect(escapedQuery).toBe("SELECT  FROM users");
    });
  });

  describe("executeQueryRO", () => {
    it("should execute a read-only query with values", async () => {
      const query = "SELECT * FROM users WHERE id = ?";
      const values = [1];
      const mockResult = [{ id: 1, name: "John Doe" }];

      (MysqlPoolRO.query as jest.Mock).mockResolvedValueOnce([mockResult]);

      const result = await mysqlRepository.executeQueryRO(query, values);
      expect(MysqlPoolRO.query).toHaveBeenCalledWith(
        "SELECT  FROM users WHERE id = ?",
        values
      );
      expect(result).toBe(mockResult);
    });

    it("should execute a read-only query without values", async () => {
      const query = "SELECT * FROM users";
      const mockResult = [{ id: 1, name: "John Doe" }];

      (MysqlPoolRO.query as jest.Mock).mockResolvedValueOnce([mockResult]);

      const result = await mysqlRepository.executeQueryRO(query);
      expect(MysqlPoolRO.query).toHaveBeenCalledWith("SELECT  FROM users");
      expect(result).toBe(mockResult);
    });

    it("should throw an InternalServerError on query failure", async () => {
      const query = "SELECT * FROM users WHERE id = ?";
      const values = [1];

      (MysqlPoolRO.query as jest.Mock).mockRejectedValueOnce(
        new Error("Query failed")
      );

      await expect(
        mysqlRepository.executeQueryRO(query, values)
      ).rejects.toThrow(InternalServerError);
      expect(MysqlPoolRO.query).toHaveBeenCalledWith(
        "SELECT  FROM users WHERE id = ?",
        values
      );
    });
  });

  describe("executeQueryRW", () => {
    it("should execute a read-write query with values", async () => {
      const query = "INSERT INTO users (name) VALUES (?)";
      const values = ["John Doe"];
      const mockResult = { insertId: 1 };

      (MysqlPoolRW.query as jest.Mock).mockResolvedValueOnce([mockResult]);

      const result = await mysqlRepository.executeQueryRW(query, values);
      expect(MysqlPoolRW.query).toHaveBeenCalledWith(
        "INSERT INTO users (name) VALUES (?)",
        values
      );
      expect(result).toBe(mockResult);
    });

    it("should throw an InternalServerError on query failure", async () => {
      const query = "INSERT INTO users (name) VALUES (?)";
      const values = ["John Doe"];

      (MysqlPoolRW.query as jest.Mock).mockRejectedValueOnce(
        new Error("Query failed")
      );

      await expect(
        mysqlRepository.executeQueryRW(query, values)
      ).rejects.toThrow(InternalServerError);
      expect(MysqlPoolRW.query).toHaveBeenCalledWith(
        "INSERT INTO users (name) VALUES (?)",
        values
      );
    });
  });
});
