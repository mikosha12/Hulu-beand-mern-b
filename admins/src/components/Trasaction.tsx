import React, { useEffect, useState } from "react";
import { fetchAllTransactions } from "../admin-Client"; // Adjust the path if necessary
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import dayjs from "dayjs"; // Import dayjs for date handling

interface Transaction {
  _id: string;
  bookingId: string;
  transactionId: string;
  email: string;
  userId: string;
  hotelId: string;
  amount: number;
  commissionAmount: number;
  hotelOwnerAmount: number;
  transactionType: "payment" | "refund";
  createdAt: string; // Assuming ISO 8601 string format
}

type Order = "asc" | "desc";

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionsPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<Order>("desc");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchAllTransactions();
        setTransactions(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    const aValue = a[sortColumn as keyof Transaction];
    const bValue = b[sortColumn as keyof Transaction];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Get current transactions to display
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Handle sort change
  const handleSortChange = (column: keyof Transaction) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "transactionId"}
                    direction={
                      sortColumn === "transactionId" ? sortDirection : "asc"
                    }
                    onClick={() => handleSortChange("transactionId")}
                  >
                    Transaction ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "bookingId"}
                    direction={
                      sortColumn === "bookingId" ? sortDirection : "asc"
                    }
                    onClick={() => handleSortChange("bookingId")}
                  >
                    Booking ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "email"}
                    direction={sortColumn === "email" ? sortDirection : "asc"}
                    onClick={() => handleSortChange("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "amount"}
                    direction={sortColumn === "amount" ? sortDirection : "asc"}
                    onClick={() => handleSortChange("amount")}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "commissionAmount"}
                    direction={
                      sortColumn === "commissionAmount" ? sortDirection : "asc"
                    }
                    onClick={() => handleSortChange("commissionAmount")}
                  >
                    Commission Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "hotelOwnerAmount"}
                    direction={
                      sortColumn === "hotelOwnerAmount" ? sortDirection : "asc"
                    }
                    onClick={() => handleSortChange("hotelOwnerAmount")}
                  >
                    Hotel Owner Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "transactionType"}
                    direction={
                      sortColumn === "transactionType" ? sortDirection : "asc"
                    }
                    onClick={() => handleSortChange("transactionType")}
                  >
                    Transaction Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "createdAt"}
                    direction={
                      sortColumn === "createdAt" ? sortDirection : "asc"
                    }
                    onClick={() => handleSortChange("createdAt")}
                  >
                    Created At
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.bookingId}</TableCell>
                  <TableCell>{transaction.email}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    ${transaction.commissionAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    ${transaction.hotelOwnerAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>
                    {dayjs(transaction.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>
    </div>
  );
};

export default TransactionsTable;
