import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import themeContext from "../context/themeContext";

const AttendanceCheck = ({ activityName, checkIn, checkOut }) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.secondaryBackground,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 10,
      }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Icon source="face-recognition" color="green" size={30} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.color }}>
          {activityName}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 10, color: theme.primaryText }}>
            {checkIn}
          </Text>
          <Icon source="arrow-right" color={theme.primaryText} size={20} />
          <Text style={{ marginLeft: 10, color: theme.primaryText }}>
            {checkOut}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AttendanceCheck;
