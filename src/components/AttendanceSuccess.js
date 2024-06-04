import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { IconButton } from "react-native-paper";
import themeContext from "../context/themeContext";

const AttendanceSuccess = ({ name, title, codetitle, avatarSource }) => {
  const theme = useContext(themeContext);
  return (
    <View style={[styles.itemContainer, { backgroundColor: theme.sectionBG }]}>
      <Image style={styles.tinyImage} source={avatarSource} />
      <View style={styles.itemInfo}>
        <Text style={[styles.name, { color: theme.color }]}>{name}</Text>
        <Text style={[styles.title, { color: theme.primaryText }]}>
          {title}
        </Text>
        <Text style={[styles.codetitle, { color: theme.primaryText }]}>
          {codetitle}
        </Text>
      </View>
      <IconButton
        icon="check-circle"
        iconColor={theme.primaryBackground}
        style={[styles.button, { backgroundColor: theme.accentGreen }]}
        size={24}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
  },
  codetitle: {
    fontSize: 14,
    color: "grey",
    textTransform: "capitalize",
  },
  button: {
    fontSize: 14,
    backgroundColor: "#CFFDE1",
    color: "#3D5656",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  tinyImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
  },
});

export default AttendanceSuccess;
