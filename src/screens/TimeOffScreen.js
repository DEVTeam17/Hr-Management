import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Icon } from "react-native-paper";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import themeContext from "../context/themeContext";

const TimeOffScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [selectedButton, setSelectedButton] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [reason, setReason] = useState("");

  const handlePress = (button) => {
    setSelectedButton(button);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setStartDate(date);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (time) => {
    setStartTime(time);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (time) => {
    setEndTime(time);
    hideEndTimePicker();
  };

  const handleReasonChange = (text) => {
    if (text.length <= 2000) {
      setReason(text);
      setCharacterCount(text.length);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "500",
            fontSize: 20,
            color: theme.color,
          }}
        >
          Time Off
        </Text>
        {/* Category Container */}
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.color }]}>
            Select a category
          </Text>
          <ScrollView horizontal contentContainerStyle={styles.buttonContainer}>
            <Button
              mode={selectedButton === "sick" ? "contained" : "outlined"}
              onPress={() => handlePress("sick")}
              style={styles.button}
              textColor={
                selectedButton === "sick" ? theme.white : theme.primaryText
              }
              buttonColor={
                selectedButton === "sick"
                  ? theme.buttonBackground
                  : theme.background
              }
            >
              Sick
            </Button>
            <Button
              mode={selectedButton === "vacation" ? "contained" : "outlined"}
              onPress={() => handlePress("vacation")}
              style={styles.button}
              textColor={
                selectedButton === "vacation" ? theme.white : theme.primaryText
              }
              buttonColor={
                selectedButton === "vacation"
                  ? theme.buttonBackground
                  : theme.background
              }
            >
              Vacation
            </Button>
            <Button
              mode={selectedButton === "maternity" ? "contained" : "outlined"}
              onPress={() => handlePress("maternity")}
              style={styles.button}
              textColor={
                selectedButton === "maternity" ? theme.white : theme.primaryText
              }
              buttonColor={
                selectedButton === "maternity"
                  ? theme.buttonBackground
                  : theme.background
              }
            >
              Maternity
            </Button>
            <Button
              mode={
                selectedButton === "personalMatters" ? "contained" : "outlined"
              }
              onPress={() => handlePress("personalMatters")}
              style={styles.button}
              textColor={
                selectedButton === "personalMatters"
                  ? theme.white
                  : theme.primaryText
              }
              buttonColor={
                selectedButton === "personalMatters"
                  ? theme.buttonBackground
                  : theme.background
              }
            >
              Personal Matters
            </Button>
          </ScrollView>
        </View>
        <View style={styles.divider} />

        {/* Duration Container */}
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.color }]}>
            Set the Duration
          </Text>

          <Text style={[styles.inputTitle, { color: theme.color }]}>
            Start Date
          </Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
            <View style={styles.datePickerContent}>
              <Text style={[styles.dateText, { color: theme.inputField }]}>
                {startDate.toDateString()}
              </Text>
              <Icon
                source="calendar-month-outline"
                color={theme.inputText}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          <View style={styles.timePickersContainer}>
            <View style={[styles.timePickerContainer, { marginRight: 5 }]}>
              <Text style={[styles.inputTitle, { color: theme.color }]}>
                Start Time
              </Text>
              <TouchableOpacity
                onPress={showStartTimePicker}
                style={styles.timePicker}
              >
                <Text style={[styles.timeText, { color: theme.inputField }]}>
                  {startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Icon source="chevron-down" color={theme.inputText} size={20} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmStartTime}
                onCancel={hideStartTimePicker}
              />
            </View>
            <View style={[styles.timePickerContainer, { marginLeft: 5 }]}>
              <Text style={[styles.inputTitle, { color: theme.color }]}>
                End Time
              </Text>
              <TouchableOpacity
                onPress={showEndTimePicker}
                style={styles.timePicker}
              >
                <Text style={[styles.timeText, { color: theme.inputField }]}>
                  {endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Icon source="chevron-down" color={theme.inputText} size={20} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmEndTime}
                onCancel={hideEndTimePicker}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Description Container */}
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.color }]}>
            Description
          </Text>
          <TextInput
            multiline
            blurOnSubmit
            onChangeText={handleReasonChange}
            value={reason}
            style={[
              [
                styles.input,
                { borderColor: theme.inputField, color: theme.inputField },
              ],
              styles.textArea,
            ]}
            placeholder="Write your complete reason here..."
            placeholderTextColor={theme.inputText}
          />
          <View style={styles.characterCountContainer}>
            <Text style={{ fontSize: 10, color: theme.inputText }}>
              Maximum 2000 characters
            </Text>
            <Text style={{ fontSize: 10, color: theme.inputField }}>
              {characterCount}/2000
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Attachment Container */}
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.color }]}>
            Attachment
            <Text style={{ fontSize: 10, color: theme.inputText }}>
              (optional)
            </Text>
          </Text>
          <Button
            icon="plus-circle-outline"
            mode="outlined"
            onPress={() => console.log("Pressed")}
            textColor={theme.borderColor}
            style={{
              borderColor: theme.borderColor,
            }}
          >
            Upload files
          </Button>
        </View>
      </ScrollView>

      <Button
        mode="contained"
        buttonColor={theme.buttonBackground}
        style={{
          marginHorizontal: 15,
          marginVertical: 20,
        }}
        onPress={() => {
          console.log("Submit Time Off Request");
          navigation.navigate("DashboardScreen");
        }}
      >
        Submit time off request
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  button: {
    margin: 5,
  },
  divider: {
    width: "100%",
    height: 5,
    backgroundColor: "grey",
    marginVertical: 20,
  },
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  datePickerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  timePickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timePickerContainer: {
    flex: 1,
  },
  timePicker: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    paddingRight: 35,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  characterCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default TimeOffScreen;
