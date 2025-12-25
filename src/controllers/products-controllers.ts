import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

export class ProductController {
  async index(Request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "ola" });
    } catch (error) {
      next(error);
    }
  }
}
