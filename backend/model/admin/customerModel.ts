import pool from "@/backend/config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export type CustomerStatus = "active" | "inactive";

export type CustomerRow = RowDataPacket & {
  id: number;
  username: string;
  email: string;
  password: string;
};

export async function getAllCustomer() {
  const [rows] = await pool.query<RowDataPacket[]>(
    `select id,username,email,role,status
    from customers`,
  );

  return rows;
}

export async function getCustomerByEmail(email: string) {
  const [rows] = await pool.query<CustomerRow[]>(
    `select * from customers where email=?`,
    [email],
  );

  return rows[0] ?? null;
}

export async function deleteCustomer(email: string) {
  const [row] = await pool.query<ResultSetHeader>(
    `delete from customers
    where email=?`,
    [email],
  );

  return row;
}

export async function changeStatus(status: CustomerStatus, email: string) {
  const [rows] = await pool.query<ResultSetHeader>(
    `update customers
    set status = ?
    where email=?`,
    [status, email],
  );

  return rows;
}

export async function checkInActiveCustomer(status: CustomerStatus) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `select id,username,email,role,status
    from customers
    where status=?`,
    [status],
  );

  return rows;
}
