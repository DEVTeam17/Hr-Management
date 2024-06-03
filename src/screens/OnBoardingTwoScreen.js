import React, { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import Button from "../components/Button";
import themeContext from "../context/themeContext";

const OnBoardingTwoScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const value = 66.6;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${value}%`,
                backgroundColor: theme.color,
              },
            ]}
          />
        </View>

        <View style={styles.skipContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
              })
            }
          >
            <Text style={[styles.skipText, { color: theme.skipText }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../assets/OnBoardingTwoScreen.png")}
          resizeMode="contain"
          style={styles.image}
        />

        <View>
          <Text style={[styles.title, { color: theme.headerText }]}>
            Elevate Your Performance
          </Text>
          <Text style={[styles.description, { color: theme.paraText }]}>
            Track your Key Performance Indicators (KPIs), set goals, and
            visualize your progress. Your career journey just got a whole lot
            clearer.
          </Text>
        </View>

        <Button
          title="Next"
          onPress={() => navigation.navigate("OnBoardingThreeScreen")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  progressBarContainer: {
    height: 4,
    borderRadius: 10,
    backgroundColor: "grey",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
  skipContainer: {
    flexDirection: "row-reverse",
  },
  skipText: {
    textAlign: "right",
  },
  image: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontWeight: "400",
    fontSize: 15,
    marginBottom: 30,
    textAlign: "center",
  },
});

export default OnBoardingTwoScreen;
