import Order from "../../models/Order";

const { ADD_ORDER, SET_ORDERS } = require("../actions/orders");

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };

    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalAmount,
        action.orderData.date
      );
      return {
        ...state,
        orders: [...state.orders, newOrder],
      };

    default:
      return state;
  }
};

export default orderReducer;
