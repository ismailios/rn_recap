import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";

const initialState = {
  availableProduct: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProduct: action.products,
        userProducts: action.products.filter(
          (product) => product.ownerId === "u1"
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (userProduct) => userProduct.id !== action.productId
        ),
        availableProduct: state.availableProduct.filter(
          (availableProduct) => availableProduct.id !== action.productId
        ),
      };

    case CREATE_PRODUCT:
      const title = action.productData.title;
      const description = action.productData.description;
      const price = action.productData.price;
      const image = action.productData.image;

      const newProduct = new Product(
        action.productData.id,
        "u1",
        title,
        image,
        description,
        price
      );

      return {
        ...state,
        availableProduct: [...state.availableProduct, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };

    case EDIT_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (userProduct) => userProduct.id === action.productId
      );

      const availableProductIndex = state.availableProduct.findIndex(
        (avProduct) => avProduct.id === action.productId
      );

      const updatedProduct = new Product(
        action.productId,
        state.userProducts[userProductIndex].ownerId,
        action.productData.title,
        action.productData.image,
        action.productData.description,
        state.userProducts[userProductIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const updatedAvailbleProducts = [...state.availableProduct];
      updatedAvailbleProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProduct: updatedAvailbleProducts,
      };

    default:
      return state;
  }
};
