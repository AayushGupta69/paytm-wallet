"use client";

import { useBalance } from "@paytm-wallet/store/balance";

export default function () {
  const balance = useBalance();
  return <div>hi there {balance}</div>;
}
