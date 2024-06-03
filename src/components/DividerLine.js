import React, { useContext } from "react";
import { View, Text } from "react-native";
import themeContext from "../context/themeContext";
import theme from "../context/theme";

const DividerLine = ({ text }) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 36,
        paddingBottom: 36,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1.5,
          backgroundColor: theme.color,
        }}
      />
      <View>
        <Text
          style={{
            width: 85,
            textAlign: "center",
            fontWeight: "300",
            color: theme.color,
          }}
        >
          {text}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1.5,
          backgroundColor: theme.color,
        }}
      />
    </View>
  );
};

export default DividerLine;
