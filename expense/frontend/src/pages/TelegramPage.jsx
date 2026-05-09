import { TelegramSync } from "../components/TelegramSync";
import { useExpense } from "../context/ExpenseContext";

export function TelegramPage() {
  const { transactions } = useExpense();
  const telegramTx = transactions.filter((tx) => tx.source === "telegram");

  return (
    <section>
      <h1>Telegram Sync</h1>
      <TelegramSync transactions={telegramTx} />
    </section>
  );
}
