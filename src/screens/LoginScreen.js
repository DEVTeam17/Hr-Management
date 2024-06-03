import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import DividerLine from "../components/DividerLine";
import { Icon } from "react-native-paper";
import themeContext from "../context/themeContext";

const image = {
  uri: "https://img.freepik.com/free-photo/black-prism-concept-ai-generated_268835-7011.jpg",
};

const LoginScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          navigation.navigate("Dashboard");
          AsyncStorage.setItem(
            "userData",
            JSON.stringify({ ...userData, loggedIn: true })
          );
        } else {
          Alert.alert("Error", "Invalid Details");
        }
      } else {
        Alert.alert("Error", "User does not exist");
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: theme.black, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView>
        <ImageBackground
          source={image}
          style={{
            paddingTop: 50,
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: theme.white,
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Welcome Back!
          </Text>
          <Text
            style={{
              color: theme.secondaryText,
              fontSize: 15,
              marginTop: 15,
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            Let’s get you sign in and we will make your work life smoother,
            together.
          </Text>
        </ImageBackground>
        <View
          style={{
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            paddingHorizontal: 20,
            backgroundColor: theme.primaryBackground,
          }}
        >
          <Text
            style={{
              marginBottom: 36,
              marginTop: 36,
              color: theme.color,
            }}
          >
            Ensure that your account is associated with your company's email
            address to access our applications.
          </Text>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Text
            onPress={() => navigation.navigate("RegisterScreen")}
            style={{
              color: theme.color,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
              marginTop: 36,
            }}
          >
            Forgot Password?
          </Text>
          <Button title="Sign In" onPress={validate} />
          <DividerLine text={"or continue"} />
          <Button
            title="Sign In With Company's URL"
            onPress={() => navigation.navigate("RegistrationScreen")}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 70,
              marginBottom: 20,
            }}
          >
            <Icon
              source="alert-circle-outline"
              color={theme.primaryText}
              size={22}
            />
            <Text
              style={{
                textAlign: "center",
                color: theme.primaryText,
                marginLeft: 10,
              }}
            >
              If you encounter issues, please contact your company's HR
              department for assistance.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
