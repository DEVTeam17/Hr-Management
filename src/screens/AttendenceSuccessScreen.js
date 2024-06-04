import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, Button } from "react-native-paper";
import AttendanceSuccess from "../components/AttendanceSuccess";

import themeContext from "../context/themeContext";

const AttendenceSuccessScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          alignSelf: "stretch",
          marginTop: 50,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor={theme.color}
          size={20}
          onPress={() => navigation.navigate("Dashboard")}
        />
      </View>
      <View style={styles.content}>
        <IconButton
          icon="check-decagram"
          iconColor={theme.color}
          style={{
            marginBottom: 20,
          }}
          size={100}
        />
        <Text style={[styles.text, { color: theme.color }]}>
          You're checked in!
        </Text>
        <Text style={styles.clockText}>08.00 AM</Text>
        <AttendanceSuccess
          name="Anthony Dsouza"
          title="Full Stack Developer"
          codetitle="iug654f"
          avatarSource={require("../assets/anthony.jpg")}
        />
        <Text style={[styles.paraText, { color: theme.primaryText }]}>
          Great job! Your attendance has been successfully logged. Hope you have
          a great day!
        </Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <Button
          mode="contained"
          buttonColor={theme.buttonBackground}
          onPress={() => navigation.navigate("DashboardScreen")}
        >
          Back To Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  clockText: {
    color: "green",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paraText: {
    marginTop: 5,
    textAlign: "center",
    marginBottom: 20,
  },
  bottomButtonContainer: {
    marginBottom: 20,
    width: "100%",
  },
});

export default AttendenceSuccessScreen;
