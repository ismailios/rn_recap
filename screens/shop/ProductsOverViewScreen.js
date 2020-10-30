import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  RefreshControl,
  Text,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

import * as productActions from "../../store/actions/products";
import { useCallback } from "react";

const ProductsOverViewScreen = (props) => {
  const products = useSelector((state) => state.product.availableProduct);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState();

  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(productActions.setProducts());
    } catch (error) {
      setError(error);
    }
    setIsRefreshing(false);
  }, [dispatch, isLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", () => {
      fetchProducts();
    });
    return () => {
      willFocus.remove();
    };
  }, [fetchProducts]);

  const addCart = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  const selectHandler = (productId) => {
    props.navigation.navigate("ProductDetails", {
      productId: productId,
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> No product Found !!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> error occured !!</Text>
        <Button
          title="Try Again !!"
          color={Colors.primary}
          onPress={fetchProducts}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={fetchProducts} />
        }
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onSelect={() => selectHandler(itemData.item.id)}
          >
            <Button
              color={Colors.primary}
              title="Go to Details"
              onPress={() => selectHandler(itemData.item.id)}
            />
            <Button
              color={Colors.accent}
              title="Add To Cart"
              onPress={() => addCart(itemData.item)}
            />
          </ProductItem>
        )}
      />
    </SafeAreaView>
  );
};

ProductsOverViewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Products OverView ",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="ios-cart"
          color="white"
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    width: "100%",
  },
});

export default ProductsOverViewScreen;
