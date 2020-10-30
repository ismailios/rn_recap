import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const setOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://recap-shop.firebaseio.com/orders/u1.json"
      );

      const resData = await response.json();

      fetchedOrder = [];

      for (const key in resData) {
        fetchedOrder.push(
          new Order(
            key,
            resData[key].items,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
    } catch (error) {
      throw error;
    }

    dispatch({
      type: SET_ORDERS,
      orders: fetchedOrder,
    });
  };
};

export const addOrder = (items, totalAmount) => {
  return async (dispatch) => {
    try {
      const date = new Date();
      const response = await fetch(
        "https://recap-shop.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            items,
            totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("smoething wrong !!!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: items,
          totalAmount: totalAmount,
          date: date,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
