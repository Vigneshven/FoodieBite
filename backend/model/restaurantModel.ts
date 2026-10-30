import { ResultSetHeader, RowDataPacket } from "mysql2";
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

export async function addRestaurant(data: {
  name: string;
  image: string;
  category: string;
}) {
  const { name, image, category } = data;
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    insert into restaurants(image,name,category)
    values(?,?,?) on duplicate key update
    image=values(image),name=values(name),category=values(category)`,
    [image, name, category],
  );

  return rows;
}

export async function checkRestaurant(data: {
  name: string;
  image: string;
  category: string;
}) {
  const { name, image, category } = data;
  const [row] = await pool.query<RowDataPacket[]>(
    `select name,image,category from restaurants where name=? and image=? and category=?`,
    [name, image, category],
  );

  return row[0] ?? null;
}

export async function deleteRestaurant(name: string) {
  const [row] = await pool.query<ResultSetHeader>(
    `delete from restaurants
    where name=?`,
    [name],
  );

  return row;
}
