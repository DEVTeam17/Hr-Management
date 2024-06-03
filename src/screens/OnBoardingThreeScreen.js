import React, { useContext } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import Button from "../components/Button";
import themeContext from "../context/themeContext";

const OnBoardingThreeScreen = ({ navigation }) => {
  const theme = useContext(themeContext);

  const value = 100;

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

        <Image
          source={require("../assets/OnBoardingThreeScreen.png")}
          resizeMode="contain"
          style={styles.image}
        />

        <View>
          <Text style={[styles.title, { color: theme.headerText }]}>
            Seize Work-Life Balance
          </Text>
          <Text style={[styles.description, { color: theme.paraText }]}>
            Need a day off? Planning a holiday? We puts time-off requests at
            your fingertips. Take charge of your work-life balance with us
          </Text>
        </View>

        <Button
          title="Next"
          onPress={() => navigation.navigate("LoginScreen")}
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

export default OnBoardingThreeScreen;
