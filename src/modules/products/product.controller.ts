import { FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service";
import { CreateProductInput } from "./product.schema";

export async function createProductHandler(
  request: FastifyRequest<{ Body: CreateProductInput }>
) {
  return await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
}

export async function getProductsHandler() {
  return await getProducts();
}
