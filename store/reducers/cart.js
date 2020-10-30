import CartItem from "../../models/CartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productTitle = addedProduct.title;
      const productPrice = addedProduct.price;

      let updatedOrNewCartItem;

      const existingItem = state.items[addedProduct.id];

      if (existingItem) {
        updatedOrNewCartItem = new CartItem(
          existingItem.quantity + 1,
          productTitle,
          productPrice,
          existingItem.sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productTitle,
          productPrice,
          productPrice
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQte = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQte > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.title,
          selectedCartItem.price,
          selectedCartItem.sum - selectedCartItem.price
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const deletedProduct = state.items[action.productId];

      const updatedItems = { ...state.items };
      delete updatedItems[action.productId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - deletedProduct.sum,
      };

    default:
      return state;
  }
};
