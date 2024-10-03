import { NextResponse } from "next/server";
import { PrismaClient } from "@paytm-wallet/database/client";

const client = new PrismaClient();

export const GET = async () => {
  await client.user.create({
    data: {
      email: "asd",
      name: "adsads",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
