import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/backend/config/db";

export type User = RowDataPacket & {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
};

export type UserRole =
  | "customer"
  | "restaurant_owner"
  | "delivery_partner"
  | "admin";
export type UserStatus = "active" | "inactive";

export async function findCustomerByEmail(email: string) {
  const [row] = await pool.execute<User[]>(
    `select id,username,email,password,role,status from customers where email=?`,
    [email],
  );

  return row[0] ?? null;
}

export async function findCustomerById(id: number) {
  const [row] = await pool.execute<
    (RowDataPacket & {
      id: number;
      username: string;
      role: UserRole;
      status: UserStatus;
    })[]
  >(`select id, username, role, status from customers where id = ?`, [id]);

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
    `insert into customers (username,email,password,role,status) values(?,?,?,?,?)`,
    [username, email, passwordHash, role, "active"],
  );

  return row.insertId;
}
