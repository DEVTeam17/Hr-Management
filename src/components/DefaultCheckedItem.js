import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import themeContext from "../context/themeContext";

const DefaultCheckedItem = ({ text }) => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.container}>
      <View style={styles.checkedCircle}>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={theme.color}
          style={styles.checkIcon}
        />
      </View>
      <Text style={[styles.text, { color: theme.color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  checkedCircle: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkIcon: {
    position: "absolute",
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
});

export default DefaultCheckedItem;
