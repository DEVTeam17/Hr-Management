import React, { useContext } from "react";
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

const OnBoardingOneScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const value = 33.3;

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
            <Text style={[styles.skipText, { color: theme.skipColor }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../assets/OnBoardingOneScreen.png")}
          resizeMode="contain"
          style={styles.image}
        />

        <View>
          <Text style={[styles.title, { color: theme.headerText }]}>
            Effortless Attendance Tracking
          </Text>
          <Text style={[styles.description, { color: theme.paraText }]}>
            Log your attendance effortlessly. Clock in, clock out – it's that
            simple. Focus on your work, and we'll take care of the rest.
          </Text>
        </View>

        <Button
          title="Next"
          onPress={() => navigation.navigate("OnBoardingTwoScreen")}
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

export default OnBoardingOneScreen;
