import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { IconButton, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import themeContext from "../context/themeContext";

const ResignFormScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [dateOfResign, setDateOfResign] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [reason, setReason] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    setDateOfResign(currentDate.toDateString());
  };

  const handleReasonChange = (text) => {
    if (text.length <= 2000) {
      setReason(text);
      setCharacterCount(text.length);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted");
    setDateOfResign("");
    setReason("");
    setCharacterCount(0);
    navigation.navigate("DashboardScreen");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor={theme.color}
            size={20}
            onPress={() => console.log("Pressed")}
          />

          <Text style={[styles.title, { color: theme.color }]}>Resign</Text>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.color }]}>
            Set your resignation date
          </Text>
          <Text style={[styles.sectionText, { color: theme.primaryText }]}>
            Set the date for up to 3 months in the future, in accordance with
            the company's notice period
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                [styles.input, { color: theme.color }],
                { borderColor: theme.primaryText },
              ]}
              placeholder="Select the date"
              placeholderTextColor={theme.primaryText}
              value={dateOfResign}
              editable={false}
            />
            <IconButton
              icon="calendar"
              size={20}
              style={styles.calendarIcon}
              onPress={toggleDatePicker}
              iconColor={theme.primaryText}
            />
          </View>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )}
        </View>

        <View style={[styles.divider, { backgroundColor: theme.background }]} />

        <View
          style={[
            styles.section,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.color }]}>
            Reasons for resignation
          </Text>
          <TextInput
            multiline
            blurOnSubmit
            onChangeText={handleReasonChange}
            value={reason}
            style={[
              [
                [styles.input, { color: theme.color }],
                { borderColor: theme.primaryText },
              ],
              styles.textArea,
            ]}
            placeholder="Write your complete reason here..."
            placeholderTextColor={theme.primaryText}
          />
          <View style={styles.characterCountContainer}>
            <Text style={{ fontSize: 10, color: theme.primaryText }}>
              Maximum 2000 characters
            </Text>
            <Text style={{ fontSize: 10, color: theme.primaryText }}>
              {characterCount}/2000
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.background }]} />

        <View
          style={[
            styles.section,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.color }]}>
            Upload resign letter
          </Text>
          <Text style={[styles.sectionText, { color: theme.primaryText }]}>
            Company requires a resignation letter to assess the seriousness of
            the decision to resign.
          </Text>
          <Button
            icon="upload"
            mode="outlined"
            onPress={() => console.log("Pressed")}
            textColor={theme.primaryText}
            style={{ borderColor: theme.primaryText }}
          >
            Upload Files
          </Button>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: theme.secondaryBackground,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Button
          mode="contained"
          buttonColor={theme.buttonBackground}
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 15,
  },
  sectionText: {
    marginBottom: 10,
    color: "grey",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingRight: 35,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  calendarIcon: {
    position: "absolute",
    right: 4,
    top: -5,
  },
  divider: {
    width: "100%",
    height: 5,
  },
  characterCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitButton: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});

export default ResignFormScreen;
