import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import themeContext from "../context/themeContext";

const ProfileItem = ({ name, iconLeft, iconRight, onPress }) => {
  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, { color: theme.color }]}
    >
      <Icon source={iconLeft} color={theme.ternaryText} size={30} />
      <Text style={[styles.name, { color: theme.ternaryText }]}>{name}</Text>
      <View style={[styles.rightIconContainer, { color: theme.color }]}>
        <Icon source={iconRight} color={theme.ternaryText} size={30} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingRight: 10,
  },
  rightIconContainer: {
    marginLeft: "auto",
  },
  name: {
    fontSize: 16,
    marginLeft: 15,
  },
});

export default ProfileItem;
