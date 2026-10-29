import { RowDataPacket } from "mysql2";
import pool from "../config/db";

export async function getAllRestaurants() {
  const [rows] = await pool.query<RowDataPacket[]>(`
        select id,image,name,category
        from restaurants
        order by id`);

  return rows;
}

export async function getRestaurantById(id: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `select * from restaurants where id=?`,
    [id],
  );
  return rows[0] ?? null;
}
