"use client";

import { Button } from "@paytm-wallet/ui/button";
import { Card } from "@paytm-wallet/ui/card";
import { Select } from "@paytm-wallet/ui/select";
import { TextInput } from "@paytm-wallet/ui/text-input";
import { useState } from "react";
import createOnRampTransactions from "../app/lib/actions/create-on-ramp-txns";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://netbanking.axisbank.com",
  },
];

export const AddMoneyCard = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />

        <div className="py-4 text-left">Bank</div>

        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />

        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransactions(amount * 100, provider);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
