import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";

export type User = RowDataPacket & {
  id: number;
  username: string;
  email: string;
  password: string;
};

export async function findCustomerByEmail(email: string) {
  const [row] = await pool.execute<User[]>(
    `select id,username,email,password from customer where email=?`,
    [email],
  );

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
) {
  const [row] = await pool.execute<ResultSetHeader>(
    `insert into customers (username,email,password) values(?,?,?)`,
    [username, email, passwordHash],
  );

  return row.insertId;
}
