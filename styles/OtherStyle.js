import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd4771a",
    paddingTop: 50,
  },
  containerHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd4771a",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 395,
    height: "100%",
  },
  icon: {
    width: 42,
    borderWidth: 0,
    marginLeft: 10,
    paddingHorizontal: 10,
    marginTop: 17,
  },
  regButton: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  buttonText: {
    color: "black",
    marginLeft: -120,
    fontSize: 15,
    marginTop: 19,
  },
  mapContainer: {
    alignItems: "center",
    width: "80%",
    height: "40%",
    borderWidth: 0.5,
    borderColor: "black",
    marginBottom: 220,
    marginTop: 150,
    marginLeft: 40,
  },
});

export default styles;
