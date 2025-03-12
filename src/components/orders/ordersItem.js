import React, { useEffect, useState } from 'react';
import { PendingState, ConfirmedState, ShippingState, DeliveredState } from './OrderStates';

function OrdersItem(props) {
    const { order, handleChangeStatusOrders, handleDetailsOrders, index } = props;

    const [orderState, setOrderState] = useState(null);

    useEffect(() => {
        switch (order.status) {
            case 0:
                setOrderState(new PendingState(order));
                break;
            case 1:
                setOrderState(new ConfirmedState(order));
                break;
            case 2:
                setOrderState(new ShippingState(order));
                break;
            case 3:
                setOrderState(new DeliveredState(order));
                break;
            default:
                setOrderState(new PendingState(order));
                break;
        }
    }, [order.status]);

    const handleStatusChange = (e) => {
        orderState.handleChangeStatusOrders(e);
        handleChangeStatusOrders(e, order._id);
    };

    return (
        <tr key={order._id}>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{`${order.userID.firstName} ${order.userID.lastName}`}</td>
            <td className="text-center">{order.address}</td>
            <td className="text-center">{order.userID.phone}</td>
            <td className="text-center">{new Date(order.createdAt).toLocaleString()}</td>
            <td className="text-center">
                <select
                    className="select-cus"
                    onChange={handleStatusChange}
                    defaultValue={order.status}
                >
                    {orderState && orderState.getStatusOptions()}
                </select>
            </td>
            <td className="text-center">
                <span
                    onClick={() => handleDetailsOrders(order, true)}
                    className="details-order"
                >
                    <i className="fas fa-info-circle"></i>
                </span>
            </td>
        </tr>
    );
}

export default OrdersItem;