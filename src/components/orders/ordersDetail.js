import React from 'react';

function OrdersDetail(props) {
    const { ordersDetail, handleToggleBtn, handleStatus } = props;

    const calculateTotalPrice = () => {
        return ordersDetail.productDetail.reduce((total, product) => {
            const price = product.productID?.price || 0;
            const quantity = product.quantity || 0;
            return total + (price * quantity);
        }, 0);
    };

    return (
        <div className="wrapper-orders">
            <div className="card card-1">
                <div className="card-body">
                    <div className="row justify-content-between mb-3">
                        <div className="col-auto">
                            <h6 className="color-1 mb-0 change-color">Chi tiết sản phẩm</h6>
                        </div>
                        <div className="col-auto "> <small>Mã đơn hàng : {ordersDetail._id}</small> </div>
                    </div>
                    <ul className="row p-0" style={{ display: 'block', overflow: 'auto', maxHeight: '210px' }}>
                        {ordersDetail.productDetail ? ordersDetail.productDetail.map(product => {
                            return (
                                <li className="col" style={{ listStyle: 'none' }} key={product._id}>
                                    <div className="card card-2">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="sq align-self-center "> <img className="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0" src={product.productID?.urls[0].url} width="50" height="50" alt={product.productID?.title} /> </div>
                                                <div className="media-body my-auto text-right">
                                                    <div className="row my-auto flex-column flex-md-row">
                                                        <div className="col my-auto">
                                                            <h6 className="mb-0"> {product.productID?.title}</h6>
                                                        </div>
                                                        <div className="col my-auto"> <small>SL : {product?.quantity}</small></div>
                                                        <div className="col my-auto">
                                                            <h6 className="mb-0">{product.productID?.price ? `${product.productID.price} đ` : 'N/A'}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }) : ''}
                    </ul>
                    <div className="row mt-4">
                        <div className="col">
                            <div className="row justify-content-between">
                                <div className="col-auto">
                                    <p className="mb-1 text-dark"><b>Chi tiết đơn hàng</b></p>
                                </div>
                                <div className="flex-sm-col text-right col">
                                    <p className="mb-1"><b>Tổng tiền sản phẩm</b></p>
                                </div>
                                <div className="flex-sm-col col-auto">
                                    <p className="mb-1">
                                        {calculateTotalPrice()} đ
                                    </p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="flex-sm-col text-right col">
                                    <p className="mb-1"> <b>Mã giảm giá áp dụng :</b></p>
                                </div>
                                <div className="flex-sm-col col-auto">
                                    <p className="mb-1">{ordersDetail?.saleCode?.code || "Không"}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="flex-sm-col text-right col">
                                    <p className="mb-1"> <b>Giảm giá</b></p>
                                </div>
                                <div className="flex-sm-col col-auto">
                                    <p className="mb-1">{`-${ordersDetail?.saleCode?.discount || "0"} ${ordersDetail?.saleCode?.type || ""}`}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="flex-sm-col text-right col">
                                    <p className="mb-1"> <b>Tổng cộng</b></p>
                                </div>
                                <div className="flex-sm-col col-auto">
                                    <p className="mb-1">{ordersDetail.total} đ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row invoice ">
                        <div className="col">
                            <p className="mb-1"> Email người đặt : {ordersDetail.email}</p>
                            <p className="mb-1"> Tên người đặt : {ordersDetail.name}</p>
                            <p className="mb-1"> Địa chỉ giao : {ordersDetail.address}</p>
                            <p className="mb-1"> Ngày đặt : {new Date(ordersDetail.createdAt).toLocaleDateString()}</p>
                            <p className="mb-1">  Số điện thoại: {ordersDetail.phone}</p>
                            <p className="mb-1"> Trạng thái : {handleStatus(ordersDetail.status)}</p>
                            <button
                                onClick={() => handleToggleBtn(false)}
                                className="mb-1 btn btn-primary">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersDetail;