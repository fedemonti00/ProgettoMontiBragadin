import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as Crypto from "expo-crypto";

export const getMyValues = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert(e);
  }
};

export const saveUser = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    Alert.alert(e);
    return false;
  }
};

export const createSHA256Hash = async (password) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashedPassword;
};

export const saveOrder = async (orders) => {
  try {
    const loggedInUser = await AsyncStorage.getItem("loggedInUser");
    const key = loggedInUser.concat("Orders");
    const jsonValue = JSON.stringify(orders);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    Alert.alert(e);
    return false;
  }
};

export const getMyOrders = async () => {
  try {
    const loggedInUser = await AsyncStorage.getItem("loggedInUser");
    const key = loggedInUser.concat("Orders");
    return getMyValues(key);
  } catch (e) {
    Alert.alert(e);
  }
};

export const addOrder = async (newOrder) => {
  try {
    const orders = await getMyOrders();
    const id = orders.length + 1;
    orders.push({
      id: id,
      date: new Date().toString(),
      order: newOrder,
    });
    await saveOrder(orders);
  } catch (e) {
    Alert.alert(e);
  }
};

export const allowOrder = async (userKey) => {
  try {
    const key = userKey.concat("Orders");
    const jsonValue = JSON.stringify([]);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Alert.alert(e);
  }
};
