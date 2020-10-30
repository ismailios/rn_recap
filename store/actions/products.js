import Axios from "axios";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
import axios from "axios";
import Product from "../../models/product";

export const setProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://recap-shop.firebaseio.com/products.json"
      );

      // if (!response.ok) {
      //   throw new Error("somthing wrong !!");
      // }

      const resData = await response.data;

      let products = [];

      for (const key in resData) {
        products.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].image,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: products,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return (dispatch) => {
    try {
      const response = fetch(
        `https://recap-shop.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE",
        }
      );

      dispatch({
        type: DELETE_PRODUCT,
        productId: productId,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addProduct = (title, price, description, image) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://recap-shop.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            price,
            description,
            image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something wrong !");
      }

      const resData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          price,
          description,
          image,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const editProduct = (productId, title, description, image) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://recap-shop.firebaseio.com/products/${productId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something wrong");
      }

      const resData = await response.json();

      dispatch({
        type: EDIT_PRODUCT,
        productId: productId,
        productData: {
          title,
          description,
          image,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
