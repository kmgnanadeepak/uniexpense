export const sortTransactions = (transactions, sortBy) => {
  const copy = [...transactions];
  if (sortBy === "date") return copy.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  if (sortBy === "amount") return copy.sort((a, b) => b.amount - a.amount);
  if (sortBy === "category") return copy.sort((a, b) => a.category.localeCompare(b.category));
  return copy;
};

export const filterTransactions = (transactions, { search, filterType }) =>
  transactions
    .filter((tx) => filterType === "all" || tx.type.toLowerCase() === filterType)
    .filter((tx) => {
      const query = search.trim().toLowerCase();
      return !query || (tx.note || "").toLowerCase().includes(query) || tx.category.toLowerCase().includes(query);
    });
