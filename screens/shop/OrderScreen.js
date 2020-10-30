import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";

import * as orderActions from "../../store/actions/orders";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const OrderScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(orderActions.setOrders());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={(itemData) => <OrderItem data={itemData.item} />}
      />
    </View>
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="ios-menu"
          color="white"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default OrderScreen;
