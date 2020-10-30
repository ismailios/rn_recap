import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CartItem = ({ data, onDelete, deletable }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.quantity}>{data.quantity}</Text>
        <Text style={styles.title}>{data.productTitle}</Text>
      </View>

      <View>
        <Text style={styles.price}>${data.productPrice}</Text>
      </View>
      {deletable && (
        <TouchableOpacity style={styles.delete} onPress={onDelete}>
          <Ionicons name="ios-trash" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "OpenSans-ExtraBold",
    marginRight: 3,
    fontSize: 15,
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontFamily: "OpenSans-ExtraBold",
    fontSize: 16,
  },
  delete: {},
});

export default CartItem;
