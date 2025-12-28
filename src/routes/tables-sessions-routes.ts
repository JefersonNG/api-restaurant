import { TablesSessionsController } from "@/controllers/tables-sessions-controller";
import { Router } from "express";

const sessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

sessionsRoutes.post("/", tablesSessionsController.create);
sessionsRoutes.get("/", tablesSessionsController.index);
sessionsRoutes.patch("/:id", tablesSessionsController.update);

export { sessionsRoutes };
