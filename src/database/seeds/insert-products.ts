import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  // Inserts seed entries
  await knex("products").insert([
    { name: "Prato acem", price: 19.6 },
    { name: "Prato picanha", price: 79.3 },
    { name: "Prato alcatra", price: 60.1 },
    { name: "Prato executivo", price: 50.4 },
    { name: "Espetinho simples", price: 9.6 },
    { name: "Espetinho completo", price: 17.5 },
    { name: "serve self", price: 89.9 },
  ]);
}
