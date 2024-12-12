import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { formatDate } from "../../lib/formatDate";
import { useState } from "react";
import styles from "./Expenses.module.scss";
import { fetchTransactions } from "../../lib/FetchTransactions";
import type { Transactions } from "../../models";

export const Expenses = () => {
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isPlaceholderData } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => fetchTransactions(page),
    placeholderData: keepPreviousData,
  });

  const TOTAL_PAGES = data?.totalPages;
  const hasNextPage = page < TOTAL_PAGES;

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h1 className={styles.heading}>Expenses</h1>

      <table className={styles.table}>
        <thead>
          <tr className={styles.title}>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data?.transactions.map((transaction: Transactions) => (
            <tr key={transaction.id} className={styles.content}>
              <td>{transaction.id}</td>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.merchant}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>

        <span>
          Page {page} of {TOTAL_PAGES}
        </span>

        <button
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((prev) => prev + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPlaceholderData || !hasNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};
