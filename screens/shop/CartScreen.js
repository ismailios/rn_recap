import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVisible = () => {
    setVisible((current) => !current);
  };

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const HandleDelete = (productId) => {
    dispatch(cartActions.removeFromCart(productId));
  };

  const handleOrderNow = async (items, totalAmount) => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(items, totalAmount));
    setIsLoading(false);
    //props.navigation.push("Order");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <View style={styles.summaryContent}>
          <View>
            <Text style={styles.summaryText}>
              Total :{" "}
              <Text style={styles.amount}>
                {" "}
                ${Math.abs(totalAmount.toFixed(2))}
              </Text>
            </Text>
          </View>
          <View>
            {isLoading ? (
              <ActivityIndicator size="small" color="red" />
            ) : (
              <Button
                title="ORDER NOW"
                disabled={
                  !cartItems || cartItems.length === 0 || totalAmount === 0
                }
                color={Colors.accent}
                onPress={() => {
                  handleOrderNow(cartItems, totalAmount);
                }}
              />
            )}
          </View>
        </View>

        <View style={styles.details}>
          <Button title="SHOW DETAILS" onPress={handleVisible} />
        </View>
        {visible && (
          <FlatList
            data={cartItems}
            keyExtractor={(itemData) => itemData.productId}
            renderItem={(itemData) => (
              <CartItem
                deletable
                data={itemData.item}
                onDelete={() => HandleDelete(itemData.item.productId)}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 15,
  },
  summary: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  summaryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: { fontSize: 20 },
  amount: {
    fontFamily: "OpenSans-ExtraBold",
    fontSize: 18,
  },

  info: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
export default CartScreen;
