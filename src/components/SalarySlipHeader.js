import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, IconButton } from "react-native-paper";

const SalarySlipHeader = ({ name, position, id, avatar }) => {
  return (
    <View style={styles.header}>
      <Avatar.Image size={60} source={avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.positionText}>{position}</Text>
        <Text style={styles.idText}>{id}</Text>
      </View>
      <IconButton
        icon="download-box-outline"
        iconColor="white"
        size={40}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  nameText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 17,
  },
  positionText: {
    color: "gray",
  },
  idText: {
    color: "gray",
  },
});

export default SalarySlipHeader;
