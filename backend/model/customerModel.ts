import { prisma } from "@/backend/lib/prisma";

export type CustomerStatus = "active" | "inactive";

export async function getAllCustomer() {
  // const [rows] = await pool.query<RowDataPacket[]>(
  //   `select id,username,email,role,status
  //   from customers`,
  // );

  // return rows;

  return await prisma.customers.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      status: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function getCustomerByEmail(email: string) {
  // const [rows] = await pool.query<CustomerRow[]>(
  //   `select * from customers where email=?`,
  //   [email],
  // );

  // return rows[0] ?? null;

  return await prisma.customers.findUnique({
    where: {
      email: email,
    },
  });
}

export async function deleteCustomer(email: string) {
  // const [row] = await pool.query<ResultSetHeader>(
  //   `delete from customers
  //   where email=?`,
  //   [email],
  // );

  // return row;

  await prisma.customers.delete({
    where: {
      email: email,
    },
  });

  return {
    affectedRow: 1,
  };
}

export async function changeStatus(status: CustomerStatus, email: string) {
  // const [rows] = await pool.query<ResultSetHeader>(
  //   `update customers
  //   set status = ?
  //   where email=?`,
  //   [status, email],
  // );

  // return rows;

  await prisma.customers.update({
    where: {
      email: email,
    },
    data: {
      status: status,
    },
  });

  return {
    affectedRow: 1,
  };
}

export async function checkInActiveCustomer(status: CustomerStatus) {
  // const [rows] = await pool.query<RowDataPacket[]>(
  //   `select id,username,email,role,status
  //   from customers
  //   where status=?`,
  //   [status],
  // );

  // return rows;

  return await prisma.customers.findMany({
    where: {
      status: status,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      status: true,
    },
  });
}
