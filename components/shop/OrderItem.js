import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import CartItem from "./CartItem";

const OrderItem = ({ data }) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible((current) => !current);
  };

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View>
          <Text style={styles.totalAmount}>${data.totalAmount.toFixed(2)}</Text>
        </View>
        <View>
          <Text style={Date}>{data.date.toLocaleDateString()}</Text>
        </View>
      </View>
      <View>
        <Button title="SHOW DETAILS" onPress={handleVisible} />
      </View>
      {visible && (
        <View>
          {data.items.map((item) => (
            <CartItem key={item.productId} data={item} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 15,
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
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default OrderItem;
