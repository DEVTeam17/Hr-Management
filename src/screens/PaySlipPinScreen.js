import React, { useState, useRef, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Icon } from "react-native-paper";

import themeContext from "../context/themeContext";

const PaySlipPinScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    if (text !== "" && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      const newPin = [...pin];
      for (let i = index - 1; i < newPin.length; i++) {
        newPin[i] = "";
      }
      setPin(newPin);
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join("");
    const userPin = "123456";

    if (enteredPin === userPin) {
      console.log("Correct PIN");
      setError(false);
      navigation.navigate("SalarySlipScreen");
      setPin(["", "", "", "", "", ""]);
      inputs.current[0].focus();
    } else {
      console.log("Incorrect PIN");
      setError(true);
      setPin(["", "", "", "", "", ""]);
      inputs.current[0].focus();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.color }]}>Payslip</Text>

      <View style={[styles.iconContainer, { backgroundColor: theme.black }]}>
        <Icon
          source="form-textbox-password"
          backgroundColor="black"
          color={theme.white}
          size={70}
        />
      </View>

      <Text style={[styles.headertext, { color: theme.color }]}>Enter PIN</Text>
      <Text style={[styles.text, { color: theme.primaryText }]}>
        For security purposes, before accessing your payslip, you need to enter
        your PIN
      </Text>

      <View style={styles.inputContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[
              styles.input,
              {
                backgroundColor: theme.ternaryBackground,
                borderColor: theme.color,
                color: theme.color,
              },
              error && { borderColor: theme.accentRed },
            ]}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            value={pin[index] ? "*" : ""}
          />
        ))}
      </View>

      {error && (
        <Text style={[styles.errorMessage, { color: theme.accentRed }]}>
          Incorrect PIN. Please try again.
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{
          backgroundColor: theme.buttonBackground,
          width: "50%",
        }}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 10,
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  headertext: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 30,
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "300",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 5,
    width: 40,
    textAlign: "center",
    borderRadius: 10,
  },

  errorMessage: {
    marginBottom: 10,
  },
});
export default PaySlipPinScreen;
