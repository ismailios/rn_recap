import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform,
  Dimensions,
} from "react-native";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if ((Platform.OS = "android" && Platform.Version > 21)) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.card}>
      <TouchableCmp
        style={styles.wrapperContent}
        onPress={() => props.onSelect()}
      >
        <View style={styles.imageWrapper}>
          <Image
            resizeMode={"cover"}
            source={{ uri: props.image }}
            style={styles.imageProduct}
          />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.titleProduct}>{props.title}</Text>
          <Text style={styles.priceProduct}>${props.price.toFixed(2)} </Text>
        </View>
      </TouchableCmp>
      <View style={styles.buttonCantainer}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  imageWrapper: {
    width: "100%",
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  productDetails: { padding: 20, alignItems: "center" },
  imageProduct: {
    width: "100%",
    height: 300,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  titleProduct: {
    fontSize: 18,
    marginVertical: 4,
  },
  priceProduct: {
    color: "#888",
    fontFamily: "OpenSans-ExtraBold",
  },
  buttonCantainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 20,
    position: "relative",
  },
});

export default ProductItem;
