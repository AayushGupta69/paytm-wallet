import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import database from "@paytm-wallet/database/client";

export default async function createOnRampTransactions(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  const userId = session.user.id;

  if (!userId) {
    return {
      message: "User not logged in.",
    };
  }

  await database.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount,
      status: "Processing",
      startTime: new Date(),
      provider,
      token,
    },
  });

  return {
    message: "On ramp transaction added",
  };
}
