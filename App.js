import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventRegister } from "react-native-event-listeners";
import { useColorScheme } from "react-native";

import theme from "./src/context/theme";
import themeContext from "./src/context/themeContext";
import OnBoardingOneScreen from "./src/screens/OnBoardingOneScreen";
import OnBoardingTwoScreen from "./src/screens/OnBoardingTwoScreen";
import OnBoardingThreeScreen from "./src/screens/OnBoardingThreeScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  let systemColor;
  if (colorScheme === "light") {
    systemColor = false;
  } else {
    systemColor = true;
  }

  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="OnBoardingOneScreen"
            component={OnBoardingOneScreen}
          />
          <Stack.Screen
            name="OnBoardingTwoScreen"
            component={OnBoardingTwoScreen}
          />
          <Stack.Screen
            name="OnBoardingThreeScreen"
            component={OnBoardingThreeScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};

export default App;
