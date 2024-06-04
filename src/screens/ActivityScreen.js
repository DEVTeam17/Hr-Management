import React, { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import AttendanceCheck from "../components/AttendenceCheck";
import ActivitySection from "../components/ActivitySection";
import themeContext from "../context/themeContext";

const image = {
  uri: "https://img.freepik.com/free-photo/black-prism-concept-ai-generated_268835-7011.jpg",
};

const ActivityScreen = () => {
  const theme = useContext(themeContext);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.black }}>
      <ImageBackground
        source={image}
        style={{
          paddingTop: 50,
          paddingHorizontal: 5,
          paddingVertical: 30,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Activity
        </Text>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <Icon
            name="search"
            size={24}
            color={theme.primaryText}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { color: theme.primaryText }]}
            placeholder="Search your payslip, attendence..."
            placeholderTextColor={theme.primaryText}
          />
          <Icon
            name="filter"
            size={24}
            color={theme.primaryText}
            style={styles.filterIcon}
            onPress={() => console.log("filter icon press")}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ color: theme.primaryText }}>Today</Text>
        <AttendanceCheck
          activityName={"Attendence Check"}
          checkIn={"10:00 AM"}
          checkOut={"not yet"}
        />
        <Text style={{ color: theme.primaryText, marginTop: 20 }}>
          Yesterday
        </Text>
        <AttendanceCheck
          activityName={"Attendence Check"}
          checkIn={"07:23 AM"}
          checkOut={"05:12 PM"}
        />
        <ActivitySection
          color="blue"
          iconLeft={"check-underline"}
          titleText={"Payroll"}
          bottomText={"September 2023"}
        />
        <Text style={{ color: theme.primaryText, marginTop: 20 }}>Tuesday</Text>

        <ActivitySection
          color="orange"
          iconLeft={"emoticon-sick-outline"}
          titleText={"Time Off"}
          bottomText={"Grandfather has passed away"}
        />
        <Text style={{ color: theme.primaryText, marginTop: 20 }}>
          Wednesday
        </Text>
        <AttendanceCheck
          activityName={"Attendence Check"}
          checkIn={"08:14 AM"}
          checkOut={"05:01 PM"}
        />
        <Text style={{ color: theme.primaryText, marginTop: 20 }}>
          19 September 2023
        </Text>
        <AttendanceCheck
          activityName={"Attendence Check"}
          checkIn={"08:14 AM"}
          checkOut={"05:01 PM"}
        />
        <Text style={{ color: theme.primaryText, marginTop: 20 }}>
          18 September 2023
        </Text>
        <AttendanceCheck
          activityName={"Attendence Check"}
          checkIn={"08:14 AM"}
          checkOut={"05:01 PM"}
        />
        <ActivitySection
          color="orange"
          iconLeft={"emoticon-sick-outline"}
          titleText={"Time Off"}
          bottomText={"Not Keeping Well"}
        />
        <Text style={{ color: theme.primaryText, marginTop: 20 }}>
          17 September 2023
        </Text>
        <AttendanceCheck
          activityName={"Attendence Check"}
          checkIn={"08:14 AM"}
          checkOut={"05:01 PM"}
        />
        <Text style={{ color: theme.primaryText, marginTop: 20 }}>
          16 September 2023
        </Text>
        <AttendanceCheck
          activityName={"Attendence Check"}
          checkIn={"08:14 AM"}
          checkOut={"05:01 PM"}
        />
        <ActivitySection
          color="blue"
          iconLeft={"check-underline"}
          titleText={"Payroll"}
          bottomText={"September 2023"}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
});

export default ActivityScreen;
