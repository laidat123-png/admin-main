class OrderState {
    constructor(order) {
        this.order = order;
    }

    handleChangeStatusOrders(e) {
        throw new Error("This method should be overridden!");
    }

    getStatusOptions() {
        throw new Error("This method should be overridden!");
    }
}

class PendingState extends OrderState {
    handleChangeStatusOrders(e) {
        // Logic to handle status change for pending state
        this.order.status = parseInt(e.target.value);
    }

    getStatusOptions() {
        return (
            <>
                <option value={0}>Chờ xác nhận</option>
                <option value={1}>Đã xác nhận</option>
                <option value={2}>Đang giao hàng</option>
                <option value={3}>Đã giao hàng</option>
            </>
        );
    }
}

class ConfirmedState extends OrderState {
    handleChangeStatusOrders(e) {
        // Logic to handle status change for confirmed state
        this.order.status = parseInt(e.target.value);
    }

    getStatusOptions() {
        return (
            <>
                <option value={1}>Đã xác nhận</option>
                <option value={2}>Đang giao hàng</option>
                <option value={3}>Đã giao hàng</option>
            </>
        );
    }
}

class ShippingState extends OrderState {
    handleChangeStatusOrders(e) {
        // Logic to handle status change for shipping state
        this.order.status = parseInt(e.target.value);
    }

    getStatusOptions() {
        return (
            <>
                <option value={2}>Đang giao hàng</option>
                <option value={3}>Đã giao hàng</option>
            </>
        );
    }
}

class DeliveredState extends OrderState {
    handleChangeStatusOrders(e) {
        // Logic to handle status change for delivered state
        this.order.status = parseInt(e.target.value);
    }

    getStatusOptions() {
        return (
            <>
                <option value={3}>Đã giao hàng</option>
            </>
        );
    }
}

export { PendingState, ConfirmedState, ShippingState, DeliveredState };