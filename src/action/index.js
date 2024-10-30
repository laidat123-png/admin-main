import * as types from '../constants/typeRedux';



export const getAllProduct = (products) => {
    return {
        type: types.GET_ALL_PRODUCT,
        products
    };
}

//Thay đổi trạng thái của modal
export const onToggleModal = (bool) => {
    return {
        type: types.TOGGLE_MODAL,
        bool
    }
}

//Cập nhật trạng thái đăng nhập
export const isLogin = (bool) => {
    return {
        type: types.IS_LOGIN,
        bool
    }
}
//Lưu trữ thông tin người dùng trong Redux store
export const setUser = (user) => {
    return {
        type: types.SET_USER,
        user
    }
}

export const addProduct = (product) => {
    return {
        type: types.ADD_PRODUCT,
        product
    }
}

export const deleteProduct = (id) => {
    return {
        type: types.DELETE_PRODUCT,
        id
    }
}

export const GetAllUser = (users) => {
    return {
        type: types.GET_ALL_USERS,
        users
    }

}


export const deleteOneUser = (id) => {
    return {
        type: types.DELETE_ONE_USER,
        id
    }
}

//Thay đổi trạng thái của navbar (mở hoặc đóng)
export const toggleNavbar = () => {
    return {
        type: types.TOGGLE_NAVBAR
    }
}

//Cập nhật tổng số người dùng trong Redux store
export const setTotalUsers = (total) => ({
  type: types.SET_TOTAL_USERS,
  payload: total,
});