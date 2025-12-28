import { TablesController } from "@/controllers/tables-controllers";
import { Router } from "express";

const tablesController = new TablesController();
const tablesRoutes = Router();

tablesRoutes.get("/", tablesController.index);

export { tablesRoutes };
