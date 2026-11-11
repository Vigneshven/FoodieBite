import { prisma } from "@/backend/lib/prisma";

export type UserRole =
  | "customer"
  | "restaurant_owner"
  | "delivery_partner"
  | "admin";
export type UserStatus = "active" | "inactive";

export async function findCustomerByEmail(email: string) {
  // const [row] = await pool.execute<User[]>(
  //   `select id,username,email,password,role,status from customers where email=?`,
  //   [email],
  // );

  // return row[0] ?? null;

  return await prisma.customers.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      role: true,
      status: true,
    },
  });
}

export async function findCustomerById(id: number) {
  // const [row] = await pool.execute<
  //   (RowDataPacket & {
  //     id: number;
  //     username: string;
  //     role: UserRole;
  //     status: UserStatus;
  //   })[]
  // >(`select id, username, role, status from customers where id = ?`, [id]);

  // return row[0] ?? null;

  return await prisma.customers.findUnique({
    where: {
      id: id,
    },
  });
}

export async function updatePasswordByHash(
  id: number,
  password: string,
): Promise<void> {
  // await pool.execute(`update customers set password=? where id=?`, [
  //   id,
  //   password,
  // ]);

  await prisma.customers.update({
    where: {
      id: id,
    },
    data: {
      password: password,
    },
  });
}

export async function createCustomer(
  username: string,
  email: string,
  passwordHash: string,
  role: Exclude<UserRole, "admin">,
) {
  // const [row] = await pool.execute<ResultSetHeader>(
  //   `insert into customers (username,email,password,role,status) values(?,?,?,?,?)`,
  //   [username, email, passwordHash, role, "active"],
  // );

  // return row.insertId;

  const customer = await prisma.customers.create({
    data: {
      username,
      email,
      password: passwordHash,
      role,
    },
    select: {
      id: true,
    },
  });

  return customer.id;
}
