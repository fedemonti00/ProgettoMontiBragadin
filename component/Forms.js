import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Platform,
  Animated,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getMyValues,
  saveUser,
  createSHA256Hash,
  allowOrder,
} from "../utils/util";
import styles from "../styles/FormsStyle";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [opacity] = useState(new Animated.Value(0));

  const handleSubmit = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Il campo non può essere vuoto.");
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setError(""));
      }, 2000);
      return;
    }
    try {
      const values = await getMyValues(email);

      if (values !== null) {
        const hashedPassword = await createSHA256Hash(password);

        if (values.password === hashedPassword) {
          setError("");
          await AsyncStorage.setItem("loggedInUser", email);
          navigation.replace("Home");
        }
      } else {
        setError("Username o password non validi");
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setError(""));
        }, 2000);
        return;
      }
    } catch (e) {
      setError(e.message);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setError(""));
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./img/logo.png")} />
      <FormText
        icoName="user"
        text="Email"
        value={email}
        security={false}
        set={setEmail}
      />
      <FormText
        icoName="lock"
        text="Password"
        value={password}
        security={true}
        set={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.regButton}
        onPress={() => navigation.navigate("SingIn")}
      >
        <Text style={styles.buttonText}>Registrati</Text>
      </TouchableOpacity>
      {error && (
        <Animated.View style={[styles.errorPopup, { opacity }]}>
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

export function SingInForm({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthState, setBirthState] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [opacity] = useState(new Animated.Value(0));

  const handleSubmit = async () => {
    if (
      firstName.trim() === "" ||
      surname.trim() === "" ||
      birthDate.trim() === "" ||
      birthState.trim() === "" ||
      birthCity.trim() === "" ||
      phoneNum.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPw.trim() === ""
    ) {
      setError("Il campo non può essere vuoto.");
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setError(""));
      }, 2000);
      return;
    } else if (!(password === confirmPw)) {
      setError("Le password non sono uguali!");
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setError(""));
      }, 2000);
      return;
    } else {
      try {
        const hashedPassword = await createSHA256Hash(password);
        let values = {
          firstName: firstName,
          surname: surname,
          birthDate: birthDate,
          birthState: birthState,
          birthCity: birthCity,
          phoneNum: phoneNum,
          email: email,
          password: hashedPassword,
        };
        if (await saveUser(email, values)) {
          await allowOrder(email);
          navigation.replace("LogIn");
        } else {
          setError("Ops, qualcosa è andato storto");
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => setError(""));
          }, 2000);
        }
      } catch (e) {
        setError(e.message);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setError(""));
        }, 2000);
      }
    }
  };

  return (
    <Pressable>
      <ScrollView
        style={{ backgroundColor: "#ffd4771a", paddingTop: 100, flexGrow: 1 }}
      >
        <View style={styles.singinContainer}>
          <Image style={styles.image} source={require("./img/logo.png")} />
          <FormText
            icoName="pencil"
            text="Nome"
            type="default"
            value={firstName}
            security={false}
            set={setFirstName}
          />
          <FormText
            icoName="pencil"
            text="Cognome"
            type="default"
            value={surname}
            security={false}
            set={setSurname}
          />
          <FormDate
            icoName="calendar"
            text="Data di Nascita"
            isEditable={true}
            value={birthDate}
            set={setBirthDate}
          />
          <FormText
            icoName="flag"
            text="Nazionalità"
            type="default"
            value={birthState}
            security={false}
            set={setBirthState}
          />
          <FormText
            icoName="pencil"
            text="Città"
            type="default"
            value={birthCity}
            security={false}
            set={setBirthCity}
          />
          <FormText
            icoName="mobile-phone"
            text="Cellulare"
            type="phone-pad"
            value={phoneNum}
            security={false}
            set={setPhoneNum}
          />
          <FormText
            icoName="user"
            text="Email"
            type="email-address"
            value={email}
            set={setEmail}
          />
          <FormText
            icoName="lock"
            text="Password"
            type="default"
            value={password}
            security={true}
            set={setPassword}
          />
          <FormText
            icoName="lock"
            text="Conferma Password"
            type="default"
            value={confirmPw}
            security={true}
            set={setConfirmPw}
          />
          <TouchableOpacity style={styles.regButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrati</Text>
          </TouchableOpacity>
          {error && (
            <Animated.View style={[styles.errorPopup, { opacity }]}>
              <Text style={styles.errorText}>{error}</Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </Pressable>
  );
}

export const FormText = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon style={styles.icon} name={props.icoName} size={22} color="black" />
      <TextInput
        style={styles.input}
        keyboardType={props.type}
        placeholder={props.text}
        value={props.value}
        secureTextEntry={props.security}
        onChangeText={props.set}
        editable={props.editable}
      />
    </View>
  );
};

export const FormDate = (props) => {
  const [date, setDate] = useState(new Date(2024, 5, 3));
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    if (props.isEditable === true) {
      setShowPicker(!showPicker);
    }
  };

  const formatDate = (rawDate) => {
    let formattedDate = new Date(rawDate);

    let year = formattedDate.getFullYear();
    let month = formattedDate.getMonth() + 1;
    let day = formattedDate.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`;
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        props.set(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    props.set(formatDate(date));
    toggleDatePicker();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showPicker && (
        <DateTimePicker
          style={styles.dataPicker}
          value={date}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
          minimumDate={new Date(1920, 1, 1)}
          maximumDate={new Date(2024, 12, 31)}
        />
      )}

      {showPicker && Platform.OS === "ios" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={[
              styles.dateBotton,
              styles.pickerBottom,
              { backgroundColor: "11182711" },
            ]}
            onPress={toggleDatePicker}
          >
            <Text style={[styles.buttonText, { color: "#o75985" }]}>
              Cancella
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateBotton, styles.pickerBottom]}
            onPress={confirmIOSDate}
          >
            <Text style={[styles.buttonText]}>Conferma</Text>
          </TouchableOpacity>
        </View>
      )}

      <Icon style={styles.icon} name={props.icoName} size={24} color="black" />
      {!showPicker && (
        <Pressable style={styles.input} onPress={toggleDatePicker}>
          <TextInput
            style={{ paddingTop: 10, color: "black" }}
            placeholder={props.text}
            value={props.value}
            onChangeText={props.set}
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}
    </View>
  );
};

export const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthState, setBirthState] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem("loggedInUser");
        if (loggedInUser) {
          const userData = await getMyValues(loggedInUser);
          setFirstName(userData.firstName || "");
          setSurname(userData.surname || "");
          setBirthDate(userData.birthDate || "");
          setBirthState(userData.birthState || "");
          setBirthCity(userData.birthCity || "");
          setPhoneNum(userData.phoneNum || "");
          setEmail(userData.email || "");
          setPassword("Password");
        }
      } catch (error) {
        console.error("Errore nel recupero delle informazioni utente:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    if (isEditable === true) {
      if (
        firstName.trim() === "" ||
        surname.trim() === "" ||
        birthDate.trim() === "" ||
        birthState.trim() === "" ||
        birthCity.trim() === "" ||
        phoneNum.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPw.trim() === ""
      ) {
        setError("Il campo non può essere vuoto.");
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setError(""));
        }, 2000);
        return;
      } else if (!(password === confirmPw)) {
        setError("Le password non sono uguali!");
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setError(""));
        }, 2000);
        return;
      } else {
        try {
          const hashedPassword = await createSHA256Hash(password);
          let values = {
            firstName: firstName,
            surname: surname,
            birthDate: birthDate,
            birthState: birthState,
            birthCity: birthCity,
            phoneNum: phoneNum,
            email: email,
            password: hashedPassword,
          };
          if (await saveUser(email, values)) {
            setIsEditable(!isEditable);
          } else {
            setError("Ops, qualcosa è andato storto");
            Animated.timing(opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();

            setTimeout(() => {
              Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start(() => setError(""));
            }, 2000);
          }
        } catch (e) {
          setError(e.message);
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => setError(""));
          }, 2000);
        }
      }
    } else {
      setIsEditable(!isEditable);
      return;
    }
  };

  return (
    <Pressable>
      <ScrollView
        style={{ backgroundColor: "#ffd4771a", paddingTop: 50, flexGrow: 1 }}
      >
        <View style={styles.singinContainer}>
          <Image style={styles.image} source={require("./img/logo.png")} />
          <FormText
            icoName="pencil"
            text="Nome"
            type="default"
            value={firstName}
            security={false}
            set={setFirstName}
            editable={isEditable}
          />
          <FormText
            icoName="pencil"
            text="Cognome"
            type="default"
            value={surname}
            security={false}
            set={setSurname}
            editable={isEditable}
          />
          <FormDate
            icoName="calendar"
            text="Data di Nascita"
            value={birthDate}
            set={setBirthDate}
            editable={isEditable}
          />
          <FormText
            icoName="flag"
            text="Nazionalità"
            type="default"
            value={birthState}
            security={false}
            set={setBirthState}
            editable={isEditable}
          />
          <FormText
            icoName="pencil"
            text="Città"
            type="default"
            value={birthCity}
            security={false}
            set={setBirthCity}
            editable={isEditable}
          />
          <FormText
            icoName="mobile-phone"
            text="Cellulare"
            type="phone-pad"
            value={phoneNum}
            security={false}
            set={setPhoneNum}
            editable={isEditable}
          />
          <FormText
            icoName="user"
            text="Email"
            type="email-address"
            value={email}
            set={setEmail}
            editable={isEditable}
          />
          <FormText
            icoName="lock"
            text="Password"
            type="default"
            value={password}
            security={true}
            set={setPassword}
            editable={isEditable}
          />
          <FormText
            icoName="lock"
            text="Conferma Password"
            type="default"
            value={confirmPw}
            security={true}
            set={setConfirmPw}
            editable={isEditable}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isEditable ? "Salva" : "Modifica"}
            </Text>
          </TouchableOpacity>
          {error && (
            <Animated.View style={[styles.errorPopup, { opacity }]}>
              <Text style={styles.errorText}>{error}</Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </Pressable>
  );
};

export default LoginScreen;
