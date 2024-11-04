// DeletedOrdersPage.js
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const DeletedOrdersPage = () => {
    const location = useLocation();
    const [deletedOrders, setDeletedOrders] = useState([]);

    useEffect(() => {
        // Load deleted orders from localStorage
        const storedDeletedOrders = JSON.parse(localStorage.getItem('deletedOrders') || '[]');
        setDeletedOrders(storedDeletedOrders);
    }, []);

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">Đơn hàng đã xóa</h6>
                    <Link 
                        to="/orders"
                        className="btn btn-primary"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Quay lại đơn hàng
                    </Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Mã đơn hàng</th>
                                    <th className="text-center">Người đặt</th>
                                    <th className="text-center">Địa chỉ</th>
                                    <th className="text-center">SĐT</th>
                                    <th className="text-center">Ngày đặt</th>
                                    <th className="text-center">Ngày xóa</th>
                                    <th className="text-center">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deletedOrders.length > 0 ? (
                                    deletedOrders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{order._id}</td>
                                            <td className="text-center">{order.name}</td>
                                            <td className="text-center">{order.address}</td>
                                            <td className="text-center">{order.phone}</td>
                                            <td className="text-center">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {new Date(order.deletedAt).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(order.total)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            Không có đơn hàng đã xóa
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletedOrdersPage;