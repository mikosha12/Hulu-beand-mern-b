import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchAllTransactions } from '../admin-Client'; // Adjust the path if necessary
import { useTheme } from '../context/ThemeContext'; // Import your theme context

interface ChartProps {
  aspect: number;
  title: string;
}

const generateMonthlyData = (transactions: any[]) => {
  // Get the current date
  const now = new Date();
  
  // Generate an array of the last 6 months, including the current month
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now);
    date.setMonth(now.getMonth() - i);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  }).reverse();

  // Initialize data structure with months and zero totals
  const data = months.map(month => ({ name: month, Total: 0 }));

  // Process transactions to aggregate total amounts by month
  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    const monthYear = transactionDate.toLocaleString('default', { month: 'short', year: 'numeric' });

    const index = data.findIndex(d => d.name === monthYear);
    if (index !== -1) {
      data[index].Total += transaction.amount;
    }
  });

  return data;
};

const Chart: React.FC<ChartProps> = ({ aspect, title }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isDarkMode } = useTheme(); // Use theme context

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactions = await fetchAllTransactions();
        const processedData = generateMonthlyData(transactions);
        setChartData(processedData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className={`flex-1 shadow-lg p-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}
    >
      <div className="text-lg font-semibold mb-5">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDarkMode ? "#82ca9d" : "#8884d8"} stopOpacity={0.8} />
              <stop offset="95%" stopColor={isDarkMode ? "#82ca9d" : "#8884d8"} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke={isDarkMode ? "gray" : "gray"} />
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgb(50, 50, 50)" : "rgb(228, 225, 225)"} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke={isDarkMode ? "#82ca9d" : "#8884d8"}
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}; 

export default Chart;
