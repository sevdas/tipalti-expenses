export const fetchTransactions = async (page = 1) => {
  const transactionsApi =
    "https://tip-transactions.vercel.app/api/transactions";

  try {
    const res = await fetch(`${transactionsApi}?page=${page}`);

    if (!res.ok) {
      console.error("Failed to fetch transactions");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
