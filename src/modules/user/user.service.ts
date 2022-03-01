import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";
import { hashPassword } from "../../utils/hash";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  return await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    select: { email: true, name: true, id: true },
  });
}
