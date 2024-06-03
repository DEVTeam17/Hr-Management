import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import themeContext from "../context/themeContext";

const Button = ({ title, onPress = () => {} }) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: theme.buttonBackground,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      }}
    >
      <Text
        style={{
          color: theme.buttonText,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
