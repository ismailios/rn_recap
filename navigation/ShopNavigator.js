import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductsOverViewScreen from "../screens/shop/ProductsOverViewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";

import { Ionicons } from "@expo/vector-icons";

// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import CustomHeaderButton from "../components/UI/CustomHeaderButton";

import Colors from "../constants/Colors";

const navigationOptions = (navData) => {
  return {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "#FFF",
  };
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOver: ProductsOverViewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-cart" size={24} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: navigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Order: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-list" size={24} color={drawerConfig.tintColor} />
      ),
    },

    defaultNavigationOptions: navigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-create" size={24} color={drawerConfig.tintColor} />
      ),
    },

    defaultNavigationOptions: navigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    products: ProductsNavigator,
    orders: OrdersNavigator,
    admin: AdminNavigator,
  },
  {
    navigationOptions: {
      activeTintColor: Colors.accent,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: navigationOptions,
  }
);

const Auth = createSwitchNavigator({
  Auth: AuthNavigator,
  ShopNavigator: ShopNavigator,
});

export default createAppContainer(Auth);
