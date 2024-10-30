import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

import axios from "axios";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import './Dashboard.css';
import MetricCard from "./MetricCard.js";
import TransactionsTable from "./TransactionsTable.js";

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productCount, setProductCount] = useState(0); // New state for product count

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/revenue/total');
        const totalRevenue = response.data.orders.reduce((sum, order) => {
          const amount = typeof order.totalAmount === 'string' 
            ? parseInt(order.totalAmount.replace('đ', '')) 
            : order.totalAmount;
          return sum + (amount || 0);
        }, 0);
        setTotalRevenue(totalRevenue);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProductCount(response.data.totalProducts);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };


    fetchTotalRevenue();
    fetchProductCount();
  }, []);

  const pieData = [
    { name: "Group A", value: 30 },
    { name: "Group B", value: 23 },
    { name: "Group C", value: 20 },
    { name: "Group D", value: 15 },
    { name: "Group E", value: 12 },
  ];

  const totalUsers = useSelector((state) => state.user);
  console.log("totalUsers", totalUsers);
  const metrics = [
    {
      title: "NGƯỜI DÙNG",
      value: totalUsers.length ? totalUsers.length : "0",
      change: "20%",
      linkText: "See all users",
      icon: "👤",
      link: "/users/list",
    },
    {
      title: "ĐƠN HÀNG",
      value: "34",
      change: "20%",
      linkText: "See all orders",
      icon: "📦",
      link: "/orders",
    },
    {
      title: "SẢN PHẨM",
      value: productCount ? productCount.toString() : "0",
      change: "20%",
      linkText: "See all products",
      icon: "📦",
      link: "/product/list",
    },
    {
      title: "SỐ DƯ",
      value: `$ ${totalRevenue}`,
      change: "20%",
      linkText: "See all balance",
      icon: "💰"
    },
  ];

  const areaData = [
    { name: "Feb", uv: 4000 },
    { name: "Mar", uv: 3000 },
    { name: "Apr", uv: 2000 },
    { name: "May", uv: 2780 },
    { name: "Jun", uv: 1890 },
    { name: "Jul", uv: 2390 },
    { name: "Aug", uv: 3490 },
    { name: "Sep", uv: 3000 },
    { name: "Oct", uv: 2000 },
    { name: "Nov", uv: 2780 },
    { name: "Dec", uv: 3890 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="dashboard">
      <div className="metrics-container">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>TỔNG DOANH THU</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <h3 className="total-sales">$ 324</h3>
          <p className="sales-description">Doanh thu hôm nay</p>
        </div>

        <div className="chart-card">
          <h2>Doanh thu (1 năm gần nhất)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <TransactionsTable />
    </div>
  );
};

export default Dashboard;