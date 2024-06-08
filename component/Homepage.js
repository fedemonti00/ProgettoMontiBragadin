import * as React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import StackNavigationOther, { Restaurant } from "./Other";
import { Account } from "./Forms";
import { StackNavigationReport } from "./ReportOrder";
import styles from "../styles/HomeStyle";
import StackNavigationOrder from "./Order";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigationHome = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePageContent}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ristorante" component={Restaurant} />
        <Stack.Screen
          name="Ordina"
          component={StackNavigationOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ordini" component={StackNavigationReport} />
        <Stack.Screen name="Profilo" component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomePageBox = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.page)}>
      <View style={styles.homeBox}>
        <Image style={styles.imageBox} source={props.image} />
        <Text style={styles.textBox}>{props.testo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomePageContent = ({ navigation }) => {
  return (
    <Pressable style={{ paddingTop: 50 }}>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#ffd4771a",
              paddingBottom: 35,
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 50,
                alignItems: "center",
                borderBottomWidth: 0.5,
                borderColor: "black",
              }}
            >
              <Image
                style={{ width: 100, height: 100, marginTop: -20 }}
                source={require("./img/logo.png")}
              />
              <Text style={styles.homeText}>Benvenuto!</Text>
            </View>
            <HomePageBox
              image={require("./img/home-pub.jpg")}
              testo="Vieni a trovarci"
              navigation={navigation}
              page="Ristorante"
            />
            <HomePageBox
              image={require("./img/home-ordina.jpg")}
              testo="Ordina in App"
              navigation={navigation}
              page="Ordina"
            />
            <HomePageBox
              image={require("./img/home-ordini.jpg")}
              testo="I tuoi ordini"
              navigation={navigation}
              page="Ordini"
            />
            <HomePageBox
              image={require("./img/home-account.png")}
              testo="Il tuo profilo"
              navigation={navigation}
              page="Profilo"
            />
          </View>
        </View>
      </ScrollView>
    </Pressable>
  );
};

const HomePage = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Altro") {
              iconName = "ellipsis-h";
            } else if (route.name === "Ordina") {
              iconName = "shopping-cart";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "gold",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigationHome}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Ordina"
          component={StackNavigationOrder}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Altro"
          component={StackNavigationOther}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomePage;
