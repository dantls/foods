"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export async function createOrder(data: Prisma.OrderCreateInput) {
  return await db.order.create({ data });
  revalidatePath("/my-orders");
}
