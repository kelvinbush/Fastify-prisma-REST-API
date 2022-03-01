import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import fastifyJwt from "fastify-jwt";
import { productSchemas } from "./modules/products/product.schema";
import productRoutes from "./modules/products/product.route";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    auth: any;
  }
}

declare module "fastify-jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(fastifyJwt, {
  secret: "jfrunrujirfurfnrmrfnrvnrvrvmrvnrvnrvnro",
});

server.decorate(
  "auth",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      console.log(e);
      return reply.send(e);
    }
  }
);

server.get("/health-check", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }
  server.register(userRoutes, { prefix: "api/users" });
  server.register(productRoutes, { prefix: "api/products" });

  try {
    await server.listen(3000, "0.0.0.0");
    console.log(`Server running at http://localhost:3000`);
  } catch (e) {
    // @ts-ignore
    console.error(e.message);
    process.exit(1);
  }
}

main().then();
