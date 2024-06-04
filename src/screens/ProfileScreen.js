import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { EventRegister } from "react-native-event-listeners";

import ProfileItem from "../components/ProfileItem";
import Profile from "../components/Profile";
import themeContext from "../context/themeContext";

const image = {
  uri: "https://img.freepik.com/free-photo/black-prism-concept-ai-generated_268835-7011.jpg",
};

const ProfileScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  let systemColor;
  if (colorScheme === "light") {
    systemColor = false;
  } else {
    systemColor = true;
  }
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(systemColor);

  const toggleDarkMode = (value) => {
    setDarkMode(value);
    EventRegister.emit("ChangeTheme", value);
  };

  const nameText = darkMode ? "Dark Mode" : "Light Mode";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Profile
          name="Anthony"
          title="Developer ."
          codetitle="DE3824-M04"
          address="At Tricks. since 2021"
          avatarSource={require("../assets/anthony.jpg")}
        />
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
          General
        </Text>
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <ProfileItem
            iconLeft="account"
            name="Account Setting"
            iconRight="chevron-right"
          />
          <ProfileItem
            iconLeft="bell"
            name="Notification"
            iconRight="chevron-right"
          />
          <ProfileItem
            iconLeft="face-recognition"
            name="Face Verification"
            iconRight="chevron-right"
          />

          <ProfileItem
            iconLeft="lock-reset"
            name="Set up your PIN"
            iconRight="chevron-right"
          />
          <ProfileItem
            iconLeft="translate"
            name="Language"
            iconRight="chevron-right"
          />
          <ProfileItem
            iconLeft="weather-night"
            name={nameText}
            iconRight={darkMode ? "toggle-switch" : "toggle-switch-off"}
            onPress={() => toggleDarkMode(!darkMode)}
          />
        </View>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
          Company
        </Text>
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <ProfileItem
            iconLeft="domain"
            name="My Company"
            iconRight="chevron-right"
          />
          <ProfileItem
            iconLeft="microsoft-windows"
            name="Structure"
            iconRight="chevron-right"
          />
        </View>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
          About
        </Text>
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <ProfileItem
            iconLeft="information-outline"
            name="Information"
            iconRight="chevron-right"
          />
          <ProfileItem
            iconLeft="medal"
            name="Awards"
            iconRight="chevron-right"
          />
          <ProfileItem
            iconLeft="elevation-rise"
            name="Career Goals"
            iconRight="chevron-right"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    justifyContent: "center",
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: "300",
  },
  sectionContainer: {
    borderRadius: 15,
    padding: 10,
  },
});

export default ProfileScreen;
