import React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

const ProductDetailsScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const products = useSelector((state) => state.product.availableProduct);
  const selectedProduct = products.find((product) => product.id === productId);

  const dispatch = useDispatch();

  const addCart = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={{ uri: selectedProduct.imageUrl }}
        />
        <Button title="Add To Cart" onPress={() => addCart(selectedProduct)} />
        <View style={styles.details}>
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: " Product Details ",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="ios-cart"
          color="white"
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: { width: "100%", height: 300 },
  details: {
    alignItems: "center",
  },
  title: { fontSize: 19, marginVertical: 5 },
  price: { fontWeight: "bold", fontSize: 20, marginVertical: 5 },
  description: { fontSize: 18, textAlign: "center", marginVertical: 5 },
});

export default ProductDetailsScreen;
