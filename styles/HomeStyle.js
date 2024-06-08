import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd4771a",
  },
  homeText: { color: "black", fontSize: 30, marginTop: 5, marginBottom: 5 },
  homeBox: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginBottom: -5,
    borderRadius: 4,
    backgroundColor: "white",
    shadowRadius: 5,
    height: 250,
  },
  textBox: { color: "black", fontSize: 30, fontWeight: "bold", marginTop: 3 },
  imageBox: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: -6,
  },
});

export default styles;
