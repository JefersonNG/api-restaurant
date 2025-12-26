import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

export class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;
      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");
      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4).optional(),
        price: z.number().optional(),
      });

      const paramSchema = z.object({
        id: z.coerce.number("ID não é um numero").positive(),
      });

      const { id } = paramSchema.parse(request.params);
      const { name, price } = bodySchema.parse(request.body);

      const product = await knex<ProductRepository>("products")
        .where({ id })
        .first();

      if (!product) throw new AppError("Product not found");

      const updateData: Partial<ProductRepository> = {};

      if (name !== undefined) updateData.name = name;
      if (price !== undefined) updateData.price = price;

      await knex<ProductRepository>("products")
        .update({ ...updateData, updated_at: knex.fn.now() })
        .where({ id });

      return response.json();
    } catch (error) {
      return next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const paramSchema = z.object({
        id: z.coerce.number("ID Não é um numero"),
      });

      const { id } = paramSchema.parse(request.params);

      const product = await knex<ProductRepository>("products")
        .where({ id })
        .first();
      if (!product) {
        throw new AppError("Product not found");
      }

      await knex("products").delete().where({ id });

      return response.json();
    } catch (error) {
      return next(error);
    }
  }
}
