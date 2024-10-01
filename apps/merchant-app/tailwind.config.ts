import type { Config } from "tailwindcss";
import sharedConfig from "@paytm-wallet/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [sharedConfig],
};

export default config;
