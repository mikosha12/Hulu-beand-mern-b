import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { fetchAllTransactions } from '../admin-Client'; // Adjust the path if necessary
import { useTheme } from '../context/ThemeContext'; // Import your theme context

interface Transaction {
  _id: string;
  amount: number;
  createdAt: string;
}

// Calculate revenue for a period based on the number of days ago
const calculateRevenue = (transactions: Transaction[], daysAgo: number) => {
  const dateThreshold = new Date();
  dateThreshold.setDate(dateThreshold.getDate() - daysAgo);
  dateThreshold.setHours(0, 0, 0, 0); // Set time to start of the day

  return transactions
    .filter(transaction => new Date(transaction.createdAt) >= dateThreshold)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
};

const Featured: React.FC = () => {
  const [todayRevenue, setTodayRevenue] = useState<number>(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState<number>(0);
  const [previousRevenue, setPreviousRevenue] = useState<number>(0); // Revenue for the day before yesterday
  const [lastWeekRevenue, setLastWeekRevenue] = useState<number>(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isDarkMode } = useTheme(); // Use theme context

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactions = await fetchAllTransactions();

        // Calculate today's and yesterday's revenue
        const today = calculateRevenue(transactions, 0);
        const yesterday = calculateRevenue(transactions, 1);
        const twoDaysAgo = calculateRevenue(transactions, 2); // Revenue for the day before yesterday

        setTodayRevenue(today);
        setYesterdayRevenue(yesterday);
        setPreviousRevenue(twoDaysAgo);

        // Last Week's revenue calculation
        setLastWeekRevenue(calculateRevenue(transactions, 7));

        // Last Month's revenue calculation
        setLastMonthRevenue(calculateRevenue(transactions, 30));

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const calculatePercentChange = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? 0 : 100; // Handle edge case where previous revenue is zero
    return ((current - previous) / previous) * 100;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate percent change from previous day to yesterday's revenue
  const percentChange = calculatePercentChange(yesterdayRevenue, previousRevenue);

  return (
    <div
      className={`flex-2 shadow-lg p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}
    >
      <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
        <h1 className="text-lg font-medium">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-5">
        <div className="w-24 h-24">
          <CircularProgressbar
            value={Math.min(Math.max(percentChange, 0), 100)} // Ensure percentage is between 0% and 100%
            text={`${percentChange.toFixed(0)}%`}
            strokeWidth={5}
            styles={{
              path: {
                stroke: isDarkMode ? '#82ca9d' : '#8884d8',
              },
              text: {
                fill: isDarkMode ? '#82ca9d' : '#8884d8',
              },
              trail: {
                stroke: isDarkMode ? '#333' : '#d6d6d6',
              },
            }}
          />
        </div>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Total sales made today</p>
        <p className="text-3xl">${todayRevenue.toFixed(2)}</p>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-light text-xs text-center`}>
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="flex justify-between w-full">
          <div className="text-center">
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Target (Yesterday)</div>
            <div className="flex items-center justify-center mt-2 text-sm text-red-500">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="ml-1">${yesterdayRevenue.toFixed(2)}</div>
            </div>
          </div>
          <div className="text-center">
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Last Week</div>
            <div className="flex items-center justify-center mt-2 text-sm text-green-500">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="ml-1">${lastWeekRevenue.toFixed(2)}</div>
            </div>
          </div>
          <div className="text-center">
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Last Month</div>
            <div className="flex items-center justify-center mt-2 text-sm text-green-500">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="ml-1">${lastMonthRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
