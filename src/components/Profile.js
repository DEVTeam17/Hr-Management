import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import themeContext from "../context/themeContext";

const Profile = ({ name, title, codetitle, avatarSource, address }) => {
  const theme = useContext(themeContext);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.profileInfo}>
        <Image style={styles.tinyImage} source={avatarSource} />
        <TouchableOpacity
          style={[
            styles.cameraButton,
            { backgroundColor: theme.primaryBackground },
          ]}
        >
          <Ionicons name="camera" size={20} color={theme.color} />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>
          {title} {codetitle}
        </Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
  },
  profileInfo: {
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 7,
  },
  title: {
    fontSize: 14,
    color: "grey",
    textTransform: "capitalize",
    textAlign: "center",
    paddingBottom: 3,
    color: "white",
    fontWeight: "300",
  },
  address: {
    fontSize: 14,
    color: "grey",
    textAlign: "center",
    color: "white",
    fontWeight: "300",
    paddingBottom: 7,
  },
  tinyImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    top: 50,
    right: 30,
    borderRadius: 15,
    padding: 5,
  },
});

export default Profile;
