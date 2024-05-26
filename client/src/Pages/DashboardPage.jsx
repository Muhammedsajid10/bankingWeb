import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/userRoute/profile', {
        headers: { Authorization: `Bearer ${user.data}` },
      });
      setBalance(data.balance);
      setTransactions(data.transactions);
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Balance: ${balance}</h2>
      <button onClick={logout}>Logout</button>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type}: ${transaction.amount} (Balance after: ${transaction.balanceAfter})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
