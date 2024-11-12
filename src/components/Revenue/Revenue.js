import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Revenue.css';

const Revenue = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ day: '', month: '', year: '' });
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/orders?status=-1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data.orders);
      setFilteredData(data.orders);
      calculateTotals(data.orders);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (orders) => {
    const deliveredOrders = orders.filter(order => order.status === 3); // Chỉ tính các đơn hàng có trạng thái "Đã giao hàng"
    const totalRecords = deliveredOrders.length;
    const totalRevenue = deliveredOrders.reduce((sum, order) => {
      const amount = typeof order.total === 'string' ? parseInt(order.total.replace('đ', '')) : order.total;
      return sum + (amount || 0);
    }, 0);
    setTotalRecords(totalRecords);
    setTotalRevenue(totalRevenue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilter = () => {
    if (!filter.day && !filter.month && !filter.year) {
      toast.error('Vui lòng nhập ít nhất một giá trị để lọc', {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true
      });
      return;
    }

    const filteredOrders = data.filter((order) => {
      const orderDate = new Date(order.createdAt);

      if (filter.year && orderDate.getFullYear() !== parseInt(filter.year)) return false;
      if (filter.month && (orderDate.getMonth() + 1) !== parseInt(filter.month)) return false;
      if (filter.day && orderDate.getDate() !== parseInt(filter.day)) return false;

      return order.status === 3; // Chỉ tính các đơn hàng có trạng thái "Đã giao hàng"
    });

    setFilteredData(filteredOrders);
    calculateTotals(filteredOrders);
  };

  const handleReset = () => {
    setFilter({ day: '', month: '', year: '' });
    setFilteredData(data.filter(order => order.status === 3)); // Chỉ tính các đơn hàng có trạng thái "Đã giao hàng"
    calculateTotals(data.filter(order => order.status === 3));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatCurrency = (amount) => {
    if (typeof amount === 'string') {
      amount = parseInt(amount.replace('đ', ''));
    }
    return `${amount.toLocaleString('vi-VN')}đ`;
  };

  const renderLoading = () => (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>
  );

  const renderError = () => (
    <div className="error-container">
      <p className="error-message">Lỗi: {error.message}</p>
    </div>
  );

  const renderRevenueData = () => (
    <div className="revenue-container">
      <h2 className="header">Quản lí Doanh thu</h2>

      <div className="filter-container">
        <label>
          Ngày:
          <input
            type="number"
            name="day"
            value={filter.day}
            onChange={handleInputChange}
            min="1"
            max="31"
            placeholder="Ngày"
          />
        </label>
        <label>
          Tháng:
          <input
            type="number"
            name="month"
            value={filter.month}
            onChange={handleInputChange}
            min="1"
            max="12"
            placeholder="Tháng"
          />
        </label>
        <label>
          Năm:
          <input
            type="number"
            name="year"
            value={filter.year}
            onChange={handleInputChange}
            min="2000"
            placeholder="Năm"
          />
        </label>
        <div className="button-group">
          <button onClick={handleFilter} className="filter-button">Lọc</button>
          <button onClick={handleReset} className="reset-button">Đặt lại</button>
        </div>
      </div>

      <div className="table-container">
        <table className="revenue-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Giá tiền đơn hàng</th>
              <th>Ngày giao</th>
            </tr>
          </thead>
          <tbody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{formatCurrency(item.total)}</td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <p><strong>Tổng đơn hàng:</strong> {totalRecords}</p>
        <p><strong>Tổng tiền đơn hàng:</strong> {formatCurrency(totalRevenue)}</p>
      </div>
    </div>
  );

  return (
    <>
      {loading ? renderLoading() : error ? renderError() : renderRevenueData()}
    </>
  );
};

export default Revenue;