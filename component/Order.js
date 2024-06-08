import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  resetCart,
} from "../cartComponent/CartReducer";
import {
  incrementProductsQuantity,
  getProducts,
  decrementProductsQuantity,
  resetProductsQuantity,
} from "../cartComponent/ProductReducer";
import { panini } from "../utils/panini";
import store from "../cartComponent/store";
import { addOrder } from "../utils/util";
import styles from "../styles/OrderStyle";

const MenuElementContainer = (props) => {
  const products = useSelector((state) => state.product.product);
  const listino = panini;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (products.length > 0) return;

    const fetchProducts = () => {
      listino.map((name) => dispatch(getProducts(name)));
    };
    fetchProducts();
  }, []);

  const MenuItem = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const addElementToCart = (item) => {
      dispatch(addToCart(item));
      dispatch(incrementProductsQuantity(item));
    };

    return (
      <View>
        <View style={styles.menuButton}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 20,
                  resizeMode: "contain",
                }}
                source={require("./img/panino.png")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuNameText}>{item.name}</Text>
              <Text style={styles.menuText}>{item.ingredienti}</Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.menuText}>{item.prezzo} €</Text>
                {cart.some((value) => value.id === item.id) ? (
                  <View style={{ flexDirection: "row", marginRight: 10 }}>
                    <Pressable
                      onPress={() => {
                        dispatch(decrementProductsQuantity(item));
                        dispatch(decrementQuantity(item));
                      }}
                    >
                      <Text style={styles.extButtonQty}>-</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.midButtonQty}>{item.quantity}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        dispatch(incrementProductsQuantity(item));
                        dispatch(incrementQuantity(item));
                      }}
                    >
                      <Text style={styles.extButtonQty}>+</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      addElementToCart(item);
                    }}
                    style={styles.buttonCart}
                  >
                    <Text style={{ padding: 3 }}>AGGIUNGI</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={{ width: "100%" }}>
        {products.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
        <View style={{ flex: 1, alignItems: "center", paddingBottom: 20 }}>
          <TouchableOpacity
            style={styles.regButton}
            onPress={() => {
              props.navigation.navigate("Pagamento", { cart, isPaga: true });
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Pagamento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export const ReceiptItem = (props) => {
  const cart = props.cart;
  const dispatch = useDispatch();
  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.prezzo,
    0
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ flex: 1, width: "100%" }}
    >
      <View style={styles.containerHeader}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#ffd4771a",
            height: "100%",
          }}
        >
          <View style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("./img/logo.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {cart.map((item) => (
              <View key={item.id} style={styles.containerScontrino}>
                <Text style={{ paddingLeft: 5 }}>
                  {item.quantity}X {item.name}
                </Text>
                <Text style={{ paddingRight: 5 }}>
                  {item.quantity * item.prezzo} €
                </Text>
              </View>
            ))}
            <View style={styles.containerScontrino}>
              <Text style={{ paddingTop: 30, paddingLeft: 5 }}>Totale:</Text>
              <Text style={{ paddingTop: 30, paddingRight: 5 }}>{total} €</Text>
            </View>
          </View>
          {props.paga ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingBottom: 30,
                backgroundColor: "#ffd4771a",
              }}
            >
              <TouchableOpacity
                style={styles.regButton}
                onPress={() => {
                  addOrder(cart)
                    .then(() => {
                      dispatch(resetCart());
                      dispatch(resetProductsQuantity());
                      props.navigation.goBack();
                    })
                    .catch((error) => {
                      Alert.alert("Error adding order", error.message);
                    });
                }}
              >
                <Text style={styles.buttonText}>Paga</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingBottom: 30,
                backgroundColor: "#ffd4771a",
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const Receipt = ({ route, navigation }) => {
  const { cart, isPaga } = route.params;

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.containerHeader}>
        <ReceiptItem paga={isPaga} cart={cart} navigation={navigation} />
      </SafeAreaView>
    </Provider>
  );
};

export const Menu = ({ navigation }) => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <MenuElementContainer navigation={navigation} />
      </SafeAreaView>
    </Provider>
  );
};

const Stack = createNativeStackNavigator();

const StackNavigationOrder = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Ordina"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Pagamento" component={Receipt} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigationOrder;
