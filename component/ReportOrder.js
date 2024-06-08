import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { getMyOrders } from "../utils/util";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "../cartComponent/store";
import { ReceiptItem } from "./Order";
import styles from "../styles/OrderStyle";

const Stack = createNativeStackNavigator();

export const StackNavigationReport = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Ordini"
          component={ReportOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scontrino"
          component={ReceiptReport}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const ReceiptReport = ({ route, navigation }) => {
  const { cart, isPaga } = route.params;

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.containerHeader}>
        <ReceiptItem paga={isPaga} cart={cart} navigation={navigation} />
      </SafeAreaView>
    </Provider>
  );
};

const ReportOrder = ({ navigation }) => {
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedOrders = await getMyOrders();
        if (fetchedOrders !== null) {
          const sorted = fetchedOrders.slice().sort((a, b) => b.id - a.id);
          setSortedOrders(sorted);
        }
      } catch (error) {
        console.error("Errore nel recupero delle informazioni utente:", error);
      }
    };

    fetchUserData();
  }, []);

  const OrderItem = ({ item }) => {
    const total = item.order.reduce(
      (sum, item) => sum + item.quantity * item.prezzo,
      0
    );
    const cart = item.order;

    return (
      <View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.navigate("Scontrino", { cart, isPaga: false });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Text>Ordine:{item.id}</Text>
            <Text>Data: {item.date}</Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text>Totale Pagato: {total} €</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{ width: "100%", backgroundColor: "#ffd4771a" }}>
      <View style={styles.containerHeader}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#ffd4771a",
            height: "100%",
          }}
        >
          <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("./img/logo.png")}
            />
          </View>
          {sortedOrders.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportOrder;
