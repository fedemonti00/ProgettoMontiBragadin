import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";
import { Account } from "./Forms";
import ReportOrder, { ReceiptReport } from "./ReportOrder";
import styles from "../styles/OtherStyle";

const ElementContainer = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.regButton}
        onPress={() => props.navigation.push(props.page, {})}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Icon
              style={styles.icon}
              name={props.icoName}
              size={24}
              color="black"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.buttonText}>{props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const Restaurant = () => {
  return (
    <View style={styles.containerHeader}>
      <View
        style={{ width: "100%", backgroundColor: "#ffd4771a", height: "100%" }}
      >
        <View style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("./img/logo.png")}
          />
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 45.66076654506935,
              longitude: 13.794408611950322,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              pinColor="red"
              coordinate={{
                latitude: 45.66076654506935,
                longitude: 13.794408611950322,
              }}
            />
          </MapView>
          <View style={{ marginTop: 30, alignItems: "center" }}>
            <Text>Vienici a trovare in:</Text>
            <Text>Piazzale Europa, 34127 Trieste TS</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Privacy = () => {
  return (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
      tortor sed nisi scelerisque consequat. Nulla quis aliquam libero. Duis
      orci lacus, euismod id mauris nec, sollicitudin dictum lacus. Nullam
      ullamcorper nisl id tincidunt congue. Maecenas sagittis sodales convallis.
      In hac habitasse platea dictumst. Nullam facilisis vehicula orci, eget
      feugiat nibh malesuada in. Mauris sed faucibus erat. Nunc finibus libero
      eu consectetur placerat. Quisque faucibus euismod sem, sit amet venenatis
      felis gravida id. Nulla eu odio ut tellus molestie vehicula. Integer
      aliquam faucibus arcu. Vestibulum ante ipsum primis in faucibus orci
      luctus et ultrices posuere cubilia curae; Pellentesque faucibus, mauris
      tincidunt porttitor finibus, massa dolor malesuada sapien, ac venenatis
      lorem neque quis turpis. Nullam vel sem ut dolor tristique tempor sit amet
      nec lacus. Vestibulum euismod leo eget varius aliquet. Fusce risus turpis,
      sodales ac mauris eu, eleifend finibus velit. Vivamus pharetra
      sollicitudin dolor, at consectetur felis pharetra eget. Proin vitae lorem
      tellus. Praesent ultricies sed risus sodales sodales. Nam fringilla nibh
      eu luctus pellentesque. Suspendisse at quam quam. Sed fringilla odio sed
      congue vulputate. Sed dignissim erat ut imperdiet commodo. Ut sollicitudin
      lacinia ante, et pellentesque tortor rhoncus eget. Vivamus blandit neque
      eget ipsum molestie, sed rhoncus lacus tempor. Suspendisse lacinia justo
      sit amet nisl vehicula faucibus.
    </Text>
  );
};

const Other = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          backgroundColor: "#ffd4771a",
          height: "100%",
          paddingTop: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 100,
          }}
        >
          <View style={{ flex: 1, marginLeft: 50, marginTop: 25 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }}> Altro</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("./img/logo.png")}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <ElementContainer
            title="Ristorante"
            icoName="map-marker"
            page="Ristorante"
            navigation={navigation}
          />
          <ElementContainer
            title="Il mio account"
            icoName="user"
            page="Account"
            navigation={navigation}
          />
          <ElementContainer
            title="I miei ordini"
            icoName="shopping-cart"
            page="Ordini"
            navigation={navigation}
          />
          <ElementContainer
            title="Privacy Policy e Termini & Condizioni"
            icoName="info"
            page="Privacy"
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const StackNavigationOther = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Altro"
          component={Other}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ristorante" component={Restaurant} />
        <Stack.Screen name="Ordini" component={ReportOrder} />
        <Stack.Screen name="Scontrino" component={ReceiptReport} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Privacy" component={Privacy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigationOther;
