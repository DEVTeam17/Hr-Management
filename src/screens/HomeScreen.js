import React, { useContext } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { Avatar, IconButton, Divider } from "react-native-paper";

import MenuButton from "../components/MenuButton";
import AttendanceItem from "../components/AttendanceItem";
import ClockInfo from "../components/ClockInfo";
import themeContext from "../context/themeContext";
import theme from "../context/theme";

const HomeScreen = ({ navigation }) => {
  const theme = useContext(themeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Container */}
        <View style={[styles.profilecontent, { backgroundColor: theme.black }]}>
          <Avatar.Image
            size={40}
            source={require("../assets/hero.jpg")}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={[styles.titleText, { color: theme.white }]}>
              Marketing Office
            </Text>
            <Text style={[styles.nameText, { color: theme.white }]}>
              Mike Cooper
            </Text>
          </View>
          <IconButton
            icon="bell"
            iconColor={theme.color}
            size={20}
            onPress={() => console.log("Pressed")}
            style={{ backgroundColor: theme.background, borderRadius: 30 }}
          />
        </View>
        {/* Overview Container */}
        <View style={{ zIndex: 1000, position: "relative", top: "-20%" }}>
          <View
            style={[
              styles.overviewContainer,
              { backgroundColor: theme.secondaryBackground },
            ]}
          >
            <View>
              <Text style={[styles.overviewText, { color: theme.color }]}>
                Today's Overview
              </Text>
              <Text style={[styles.overviewDate, { color: theme.color }]}>
                24 September 2023
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <IconButton
                icon="dots-horizontal"
                iconColor={theme.color}
                size={20}
                onPress={() => console.log("Pressed")}
              />
            </View>
            {/* Clock In */}
            <View
              style={[
                styles.clockContainer,
                { backgroundColor: theme.ternaryBackground },
              ]}
            >
              <ClockInfo
                title="Clock In"
                time="08:00 AM"
                buttonTitle="Done at 07:58 AM"
                mode={"elevated"}
                textColor={"green"}
                style={{ backgroundColor: theme.clockInButtonColour }}
              />
              {/* Clock Out */}
              <ClockInfo
                title="Clock Out"
                time="05:00 PM"
                buttonTitle="Not Yet"
                mode={"contained"}
                style={{ backgroundColor: theme.clockOutButtonColour }}
              />
            </View>
          </View>
          {/* Menu Container */}
          <View>
            {/* Buttons */}
            <View style={styles.buttonRow}>
              <MenuButton
                icon="text-box-outline"
                iconColor={theme.menuIconGreen}
                text="Payroll"
                onPress={() => console.log("Payroll button Pressed")}
              />
              <MenuButton
                icon="hand-coin-outline"
                iconColor={theme.menuIconRed}
                text="Payslip"
                onPress={() => navigation.navigate("PaySlipPinScreen")}
              />
              <MenuButton
                icon="chat-outline"
                iconColor={theme.menuIconOrange}
                text="Counseling"
                onPress={() => console.log("Counseling button Pressed")}
              />
              <MenuButton
                icon="file-document-edit-outline"
                iconColor={theme.menuIconGreen}
                text="Time Off"
                onPress={() => console.log("Time Off button Pressed")}
              />
              <MenuButton
                icon="calendar-month-outline"
                iconColor={theme.menuIconRed}
                text="Calendar"
                onPress={() => console.log("Calendar button Pressed")}
              />
              <MenuButton
                icon="timer-outline"
                iconColor={theme.menuIconGreen}
                text="Overtime"
                onPress={() => console.log("Overtime button Pressed")}
              />
              <MenuButton
                icon="close-circle"
                iconColor={theme.menuIconRed}
                text="Resign"
                onPress={() => navigation.navigate("ResignScreen")}
              />
              <MenuButton
                icon="dots-horizontal"
                iconColor={theme.color}
                text="Other"
                onPress={() => console.log("Other button Pressed")}
              />
            </View>
          </View>

          {/* Attendance Container */}
          <View
            style={[
              styles.attendanceContainer,
              { backgroundColor: theme.secondaryBackground },
            ]}
          >
            <View style={styles.header}>
              <Text style={[styles.headerText, { color: theme.color }]}>
                Attendance Tracking
              </Text>
              <Text
                onPress={() => console.log("View All Pressed")}
                style={[styles.viewAllText, { color: theme.color }]}
              >
                View All
              </Text>
            </View>
            {/* Attendance Items */}
            <AttendanceItem
              name="Anthony"
              title="Developer"
              time="05:55 AM"
              avatarSource={require("../assets/anthony.jpg")}
            />
            <Divider />
            <AttendanceItem
              name="Bhavik"
              title="IT"
              time="05:50 AM"
              avatarSource={require("../assets/bhavik.jpg")}
            />
            <Divider />

            <AttendanceItem
              name="Parag"
              title="Senior Developer"
              time="11:00 AM"
              avatarSource={require("../assets/parag.jpg")}
            />
            <Divider />

            <AttendanceItem
              name="Deepa"
              title="Front End Developer"
              time="06:10 AM"
              avatarSource={require("../assets/deepa.jpg")}
            />
            <Divider />
            <AttendanceItem
              name="Tania"
              title="Product Manager"
              time="06:10 AM"
              avatarSource={require("../assets/Tania.jpg")}
            />
            <Divider />
            <AttendanceItem
              name="Bhavika"
              title="Analyst"
              time="08:10 AM"
              avatarSource={require("../assets/bhavika.jpg")}
            />
            <Divider />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  profilecontent: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 25,
    height: "30%",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titleText: {
    marginBottom: 5,
    color: theme.white,
    fontWeight: "200",
  },
  nameText: {
    marginBottom: 5,
    color: theme.white,
  },
  overviewContainer: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  overviewText: {
    fontWeight: "200",
    fontSize: 15,
    paddingBottom: 5,
  },
  overviewDate: {
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 10,
  },
  clockContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  attendanceContainer: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    alignSelf: "flex-start",
    fontSize: 17,
    fontWeight: "bold",
    alignItems: "center",
  },
  viewAllText: {
    alignSelf: "flex-end",
    fontSize: 12,
    alignItems: "center",
    fontWeight: "200",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
