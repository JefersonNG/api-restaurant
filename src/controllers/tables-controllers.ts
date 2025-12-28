import { knex } from "@/database/knex";
import { Request, Response, NextFunction } from "express";

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables").select();
      return response.json(tables);
    } catch (error) {
      return next(error);
    }
  }
}

export { TablesController };
