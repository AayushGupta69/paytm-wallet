import express from "express";
import database from "@paytm-wallet/database/client";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  // TODO: Add zod validation here
  // TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await database.$transaction([
      database.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      database.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured!",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook!",
    });
  }
});

app.listen(3003, () => {
  console.log("Webhook listening on port 3003...");
});
