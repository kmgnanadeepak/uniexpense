import { CATEGORY_OPTIONS } from "./constants";

export function parseTelegramMessage(message = "") {
  const lower = message.toLowerCase();
  const type = lower.includes("/income") ? "credit" : "debit";
  const amountMatch = lower.match(/(\d+(\.\d+)?)/);
  const amount = amountMatch ? Number(amountMatch[1]) : 0;
  const category = CATEGORY_OPTIONS[type].find((c) => lower.includes(c.toLowerCase())) || CATEGORY_OPTIONS[type][0];
  return { type, amount, category };
}
