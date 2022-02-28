import Fastify from "fastify";

const server = Fastify();
server.get("/health-check", async function () {
  return { status: "OK" };
});

async function main() {
  try {
    await server.listen(3000, "0.0.0.0");
    console.log(`Server running at http://localhost:3000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().then();
