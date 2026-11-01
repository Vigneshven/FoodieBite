import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";

export type User = RowDataPacket & {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type UserRole = "customer" | "restaurant_owner" | "admin";

export async function findCustomerByEmail(email: string) {
  const [row] = await pool.execute<User[]>(
    `select id,username,email,password,role from customers where email=?`,
    [email],
  );

  return row[0] ?? null;
}

export async function findCustomerById(id: number) {
  const [row] = await pool.execute<(RowDataPacket & {
    id: number;
    username: string;
    role: UserRole;
  })[]>(`select id, username, role from customers where id = ?`, [id]);

  return row[0] ?? null;
}

export async function updatePasswordByHash(
  id: number,
  password: string,
): Promise<void> {
  await pool.execute(`update customers set password=? where id=?`, [
    id,
    password,
  ]);
}

export async function createCustomer(
  username: string,
  email: string,
  passwordHash: string,
  role: Exclude<UserRole, "admin">,
) {
  const [row] = await pool.execute<ResultSetHeader>(
    `insert into customers (username,email,password,role) values(?,?,?,?)`,
    [username, email, passwordHash, role],
  );

  return row.insertId;
}
