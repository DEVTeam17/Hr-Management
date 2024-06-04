import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import themeContext from "../context/themeContext";

const ActivitySection = ({
  iconLeft,
  titleText,
  bottomText,
  color = "blue",
}) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.secondaryBackground,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
      }}
    >
      <Icon source={iconLeft} type="material" color={color} size={30} />
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 10,
            color: theme.color,
          }}
        >
          {titleText}
        </Text>
        <Text style={{ paddingLeft: 10, color: theme.primaryText }}>
          {bottomText}
        </Text>
      </View>
    </View>
  );
};

export default ActivitySection;
