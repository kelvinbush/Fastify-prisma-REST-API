import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct } from "./product.service";
import { CreateProductInput } from "./product.schema";

export async function createProductHandler(
  request: FastifyRequest<{ Body: CreateProductInput }>
) {
  return await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
}
