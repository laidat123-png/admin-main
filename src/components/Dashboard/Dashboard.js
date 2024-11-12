import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const [todayRevenue, setTodayRevenue] = useState(0); // New state for today's revenue
  const [productCount, setProductCount] = useState(0); // New state for product count
  const [userCount, setUserCount] = useState(0); // New state for user count
  const [orderCount, setOrderCount] = useState(0); // New state for order count

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders?status=-1');
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        let totalRevenue = 0;
        let todayRevenue = 0;

        response.data.orders.forEach(order => {
          if (order.status === 3) { // Chỉ tính các đơn hàng có trạng thái "Đã giao hàng"
            const amount = typeof order.total === 'string' 
              ? parseInt(order.total.replace('đ', '')) 
              : order.total;
            totalRevenue += amount || 0;

            if (order.createdAt.split('T')[0] === today) {
              todayRevenue += amount || 0;
            }
          }
        });

        setTotalRevenue(totalRevenue);
        setTodayRevenue(todayRevenue);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/revenue/count-drash-board');
        const data = response.data;
        console.log(data)
        setProductCount(data.countProduct);
        setOrderCount(data.countOrder);
        setUserCount(data.countUser);
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

  const formatCurrency = (amount) => {
    // Xử lý cả trường hợp amount là string hoặc number
    if (typeof amount === 'string') {
      amount = parseInt(amount.replace('đ', ''));
    }
    return `${amount.toLocaleString('vi-VN')}đ`;
  };

  const metrics = [
    {
      title: "NGƯỜI DÙNG",
      value: userCount,
      change: "20%",
      linkText: "Xem tất cả",
      icon: "👤",
      link: "/users/list",
    },
    {
      title: "ĐƠN HÀNG",
      value: orderCount,
      change: "20%",
      linkText: "Xem tất cả",
      icon: "📦",
      link: "/orders",
    },
    {
      title: "SẢN PHẨM",
      value: productCount,
      change: "20%",
      linkText: "Xem tất cả",
      icon: "📦",
      link: "/product/list",
    },
    {
      title: "DOANH THU",
      value: formatCurrency(totalRevenue),
      change: "20%",
      linkText: "Xem tất cả",
      icon: "💰",
      link: "/Revenue",
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
          <h3 className="total-sales">{formatCurrency(todayRevenue)}</h3>
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