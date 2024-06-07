import React, { useState, useCallback } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import groupBy from "lodash/groupBy";
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
} from "react-native-calendars";
import { timelineEvents, getDate } from "../mocks/timelineEvents";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS = timelineEvents;

const TimelineCalendarScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventTitle, setEventTitle] = useState("");
  const [eventSummary, setEventSummary] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [eventsByDate, setEventsByDate] = useState(
    groupBy(EVENTS, (e) =>
      CalendarUtils.getCalendarDateString(e.start.split(" ")[0])
    )
  );

  const marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
  };

  const onDateChanged = useCallback((date, source) => {
    setCurrentDate(date);
  }, []);

  const onMonthChange = useCallback((month, updateSource) => {}, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (time) => {
    setSelectedStartTime(time);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (time) => {
    setSelectedEndTime(time);
    hideEndTimePicker();
  };

  const createEvent = () => {
    if (
      !eventTitle ||
      !selectedDate ||
      !selectedStartTime ||
      !selectedEndTime
    ) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const startDateTime = `${CalendarUtils.getCalendarDateString(
      selectedDate
    )} ${selectedStartTime.toLocaleTimeString("en-GB")}`;
    const endDateTime = `${CalendarUtils.getCalendarDateString(
      selectedDate
    )} ${selectedEndTime.toLocaleTimeString("en-GB")}`;

    const newEvent = {
      start: startDateTime,
      end: endDateTime,
      title: eventTitle,
      summary: eventSummary,
      color: "lightgreen",
    };

    const eventDate = CalendarUtils.getCalendarDateString(selectedDate);

    setEventsByDate((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      if (updatedEvents[eventDate]) {
        updatedEvents[eventDate].push(newEvent);
      } else {
        updatedEvents[eventDate] = [newEvent];
      }
      return updatedEvents;
    });

    setModalVisible(false);
    setEventTitle("");
    setEventSummary("");
    setSelectedDate(null);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };

  const timelineProps = {
    format24h: true,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 30 }}>Calendar</Text>
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar firstDay={1} markedDates={marked} />
        <TimelineList
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={INITIAL_TIME}
          alwaysBounceVertical={true}
        />
      </CalendarProvider>
      <Button
        icon="plus-circle"
        mode="contained"
        buttonColor="black"
        onPress={() => setModalVisible(true)}
        style={{ marginHorizontal: 20 }}
      >
        New Event
      </Button>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Event</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={eventTitle}
                  onChangeText={(text) => setEventTitle(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={showDatePicker}
                >
                  <Text style={styles.dateText}>
                    {selectedDate ? selectedDate.toDateString() : "Select Date"}
                  </Text>
                  <Icon
                    name="calendar-month"
                    size={20}
                    style={styles.iconRight}
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDate}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={styles.timeInputContainer}>
                <View style={styles.startTimePickerContainer}>
                  <Text style={styles.label}>Start Time</Text>
                  <TouchableOpacity
                    style={styles.timePicker}
                    onPress={showStartTimePicker}
                  >
                    <Text style={styles.timeText}>
                      {selectedStartTime
                        ? selectedStartTime.toLocaleTimeString("en-GB")
                        : "Select Time"}
                    </Text>
                    <Icon
                      name="arrow-drop-down"
                      size={20}
                      style={styles.iconRight}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmStartTime}
                    onCancel={hideStartTimePicker}
                  />
                </View>
                <View style={styles.endTimePickerContainer}>
                  <Text style={styles.label}>End Time</Text>
                  <TouchableOpacity
                    style={styles.timePicker}
                    onPress={showEndTimePicker}
                  >
                    <Text style={styles.timeText}>
                      {selectedEndTime
                        ? selectedEndTime.toLocaleTimeString("en-GB")
                        : "Select Time"}
                    </Text>
                    <Icon
                      name="arrow-drop-down"
                      size={20}
                      style={styles.iconRight}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmEndTime}
                    onCancel={hideEndTimePicker}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Summary</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Summary"
                  value={eventSummary}
                  onChangeText={(text) => setEventSummary(text)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={styles.button}
                  buttonColor="black"
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={createEvent}
                  style={styles.button}
                  buttonColor="black"
                >
                  Create Event
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
  },
  timeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startTimePickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  endTimePickerContainer: {
    flex: 1,
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 16,
  },
  iconRight: {
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default TimelineCalendarScreen;
