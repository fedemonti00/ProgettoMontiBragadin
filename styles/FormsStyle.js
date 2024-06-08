import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd4771a",
  },
  singinContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 40,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  icon: {
    width: 42,
    borderWidth: 0,
    marginLeft: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: { width: 150, height: 150, marginBottom: 100 },
  loginButton: {
    width: "80%",
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  regButton: {
    width: "80%",
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dataPicker: {
    height: 120,
    marginTop: -10,
  },
  dateBotton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
  },
  pickerBottom: {
    paddingHorizontal: 20,
  },
  errorPopup: {
    width: "80%",
    top: "2%",
    marginLeft: "20%",
    right: "10%",
    padding: 20,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Aggiunge ombra su Android
    shadowColor: "#000", // Aggiunge ombra su iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
