import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";

import ShopNavigator from "./navigation/ShopNavigator";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFont = () => {
  return Font.loadAsync({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  });
};

const rootReducers = combineReducers({
  product: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <AppLoading startAsync={fetchFont} onFinish={() => setLoaded(true)} />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
