import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Agenda } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

const CalendarScreen = () => {
  const [items, setItems] = useState({
    "2024-05-22": [
      {
        title: "Meeting 1",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        description: "You need to presence through this app",
        date: "2024-05-22",
      },
    ],
    "2024-05-23": [
      {
        title: "Meeting 2",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        description: "Meeting with Sam",
        date: "2024-05-23",
      },
    ],
    "2024-05-24": [],
    "2024-05-25": [
      {
        title: "Meeting 3",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        description: "Team Sync-up",
        date: "2024-05-25",
      },
    ],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const handleConfirmDate = (date) => {
    setNewEvent({ ...newEvent, date: date.toISOString().split("T")[0] });
    hideDatePicker();
  };

  const handleConfirmStartTime = (time) => {
    setNewEvent({
      ...newEvent,
      startTime: time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    hideStartTimePicker();
  };

  const handleConfirmEndTime = (time) => {
    setNewEvent({
      ...newEvent,
      endTime: time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    hideEndTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const addEvent = () => {
    const { date, title, startTime, endTime, description } = newEvent;
    const eventDetails = { title, startTime, endTime, description, date };
    if (items[date]) {
      setItems({
        ...items,
        [date]: [...items[date], eventDetails],
      });
    } else {
      setItems({
        ...items,
        [date]: [eventDetails],
      });
    }
    setModalVisible(false);
    setNewEvent({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    });
  };

  const getStatusColor = (date, startTime, endTime) => {
    const now = new Date();
    const eventDate = new Date(date);

    // Splitting startTime and endTime by ":" and space
    const [startHours, startMinutes, startPeriod] = startTime.split(/:| /);
    const [endHours, endMinutes, endPeriod] = endTime.split(/:| /);

    // Convert start time to 24-hour format
    let adjustedStartHours = parseInt(startHours);
    if (
      startPeriod &&
      startPeriod.toLowerCase() === "pm" &&
      adjustedStartHours !== 12
    ) {
      adjustedStartHours += 12;
    } else if (
      startPeriod &&
      startPeriod.toLowerCase() === "am" &&
      adjustedStartHours === 12
    ) {
      adjustedStartHours = 0;
    }

    // Convert end time to 24-hour format
    let adjustedEndHours = parseInt(endHours);
    if (
      endPeriod &&
      endPeriod.toLowerCase() === "pm" &&
      adjustedEndHours !== 12
    ) {
      adjustedEndHours += 12;
    } else if (
      endPeriod &&
      endPeriod.toLowerCase() === "am" &&
      adjustedEndHours === 12
    ) {
      adjustedEndHours = 0;
    }

    // Set event start and end times
    eventDate.setHours(adjustedStartHours, parseInt(startMinutes));
    const eventEndDate = new Date(date);
    eventEndDate.setHours(adjustedEndHours, parseInt(endMinutes));

    // Compare current time with event time
    if (now < eventDate) return "#0000ff"; // yet to start (blue)
    if (now >= eventDate && now <= eventEndDate) return "#00ff00"; // ongoing (green)
    return "#ff0000"; // completed (red)
  };

  const lightShadeColors = {
    "#ff0000": "#FFEBEA", // light red
    "#00ff00": "#E7FFEB", // light green
    "#0000ff": "#E7EFFF", // light blue
  };

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={items}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemHeader}>
              <View
                style={{
                  width: 5,
                  borderRadius: 10,
                  backgroundColor: getStatusColor(
                    item.date,
                    item.startTime,
                    item.endTime
                  ),
                }}
              />
              <View style={{ flexDirection: "column", marginRight: 10 }}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text
                  style={[
                    styles.itemTime,
                    {
                      color: getStatusColor(
                        item.date,
                        item.startTime,
                        item.endTime
                      ),
                      backgroundColor:
                        lightShadeColors[
                          getStatusColor(
                            item.date,
                            item.startTime,
                            item.endTime
                          )
                        ],
                    },
                  ]}
                >
                  {item.startTime} - {item.endTime}
                </Text>
              </View>
              <IconButton
                icon="alarm"
                iconColor="red"
                size={20}
                onPress={() => console.log("Alarm Pressed")}
                style={{ backgroundColor: "#FFEBEA", borderRadius: 10 }}
              />
            </View>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        icon="plus-circle-outline"
        mode="contained"
        onPress={() => setModalVisible(true)}
        buttonColor="black"
      >
        Add Event
      </Button>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Event</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.datePicker}
            >
              <Text style={styles.dateText}>
                {newEvent.date || "Select Date"}
              </Text>
              <Icon name="calendar-month" size={20} style={styles.iconRight} />
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
                onPress={showStartTimePicker}
                style={styles.timePicker}
              >
                <Text style={styles.timeText}>
                  {newEvent.startTime || "Select Time"}
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
                onPress={showEndTimePicker}
                style={styles.timePicker}
              >
                <Text style={styles.timeText}>
                  {newEvent.endTime || "Select Time"}
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
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newEvent.description}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, description: text })
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={addEvent}
              style={styles.button}
              buttonColor="black"
            >
              Create Event
            </Button>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={styles.button}
              buttonColor="black"
            >
              Cancel
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    marginTop: 17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleText: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  itemTime: {
    backgroundColor: "#E7EFFF",
    borderRadius: 15,
    color: "#1263FB",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    fontSize: 18,
  },
  descriptionText: {
    color: "#9AA0A6",
    fontSize: 15,
    fontWeight: "300",
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
  },
  timeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  startTimePickerContainer: {
    flex: 1,
    marginRight: 5,
  },
  endTimePickerContainer: {
    flex: 1,
    marginLeft: 5,
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: "48%",
  },

  iconRight: {
    marginLeft: 10,
  },
});

export default CalendarScreen;
