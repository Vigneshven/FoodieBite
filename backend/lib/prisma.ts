import dotenv from "dotenv";
import path from "node:path";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../prisma/generated/prisma/client";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const databaseURL = process.env.DB_URL;

if (!databaseURL) {
  throw new Error("DB_URL is missing");
}

const adapter = new PrismaMariaDb(databaseURL);

export const prisma = new PrismaClient({ adapter });
