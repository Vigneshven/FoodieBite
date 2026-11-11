import { prisma } from "@/backend/lib/prisma";

export async function getAllRestaurants() {
  // const [rows] = await pool.query<RowDataPacket[]>(`
  //       select id,image,name,category
  //       from restaurants
  //       order by id`);

  // return rows;

  return await prisma.restaurants.findMany({
    select: {
      id: true,
      image: true,
      name: true,
      category: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function getRestaurantById(id: number) {
  // const [rows] = await pool.query<RowDataPacket[]>(
  //   `select * from restaurants where id=?`,
  //   [id],
  // );
  // return rows[0] ?? null;

  return await prisma.restaurants.findUnique({
    where: {
      id: id,
    },
  });
}

export async function addRestaurant(data: {
  name: string;
  image: string;
  category: string;
}) {
  const { name, image, category } = data;
  // const [rows] = await pool.query<RowDataPacket[]>(
  //   `
  //   insert into restaurants(image,name,category)
  //   values(?,?,?) on duplicate key update
  //   image=values(image),name=values(name),category=values(category)`,
  //   [image, name, category],
  // );

  // return rows;

  return await prisma.restaurants.create({
    data: {
      name,
      image,
      category,
    },
  });
}

export async function checkRestaurant(data: {
  name: string;
  image: string;
  category: string;
}) {
  const { name } = data;
  // const [row] = await pool.query<RowDataPacket[]>(
  //   `select name,image,category from restaurants where name=? and image=? and category=?`,
  //   [name, image, category],
  // );

  // return row[0] ?? null;

  return await prisma.restaurants.findMany({
    where: {
      name,
    },
    select: {
      name: true,
      image: true,
      category: true,
    },
  });
}

export async function deleteRestaurant(name: string) {
  // const [row] = await pool.query<ResultSetHeader>(
  //   `delete from restaurants
  //   where name=?`,
  //   [name],
  // );

  // return row;

  await prisma.restaurants.delete({
    where: {
      name: name,
    },
  });
  return {
    affectedRow: 1,
  };
}
