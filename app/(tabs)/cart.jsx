import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../context/CartProvode";
import CartItem from "../components/Cart/CartItem";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
    Toast.show({
      type: "success",
      text1: "Checkout Successful",
      text2: "You are now checked out",
    });
  };

  const renderItem = ({ item }) => (
    <CartItem
      item={item}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.headerText}>Cart Page</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.productContainer}>
          <Text style={styles.headerTextProduct}>Products</Text>
          <View style={styles.productList}>
            {cartItems.length === 0 ? (
              <Text style={styles.noProductText}>No product in cart</Text>
            ) : (
              <Pressable onPress={handleCheckout}>
                <Text>Checkout</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <Text>Total</Text>
        <Text>1200 </Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FEF3E2",
    marginBottom: 60,
    height: "100%",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  productImage: {
    width: 70,
    height: 50,
    objectFit: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  scrollView: {
    padding: 20,
    backgroundColor: "#FEF3E2",
    height: "100%",
  },
  productContainer: {
    marginBottom: 20,
    borderBottomColor: "#555",
    borderBottomWidth: 3,
    paddingBottom: 20,
  },
  headerTextProduct: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    maerginBottom: 20,
  },
  productList: {
    flexDirection: "column",
    marginBottom: 20,
  },
  Singleproduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    flexDirection: "column",
    marginBottom: 10,
    marginRight: 60,
  },
  productPriceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginBottom: 300,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
