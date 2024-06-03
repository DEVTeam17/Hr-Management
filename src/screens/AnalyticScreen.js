import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import themeContext from "../context/themeContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth();

const AnalyticScreen = () => {
  const theme = useContext(themeContext);
  const currentYear = getCurrentYear();
  const currentMonthIndex = getCurrentMonth();

  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [modalVisible, setModalVisible] = useState(false);
  const [downloadMonth, setDownloadMonth] = useState(selectedMonth);

  const years = Array.from({ length: currentYear - 1999 }, (_, i) => i + 2000);

  const handleSelectMonthYear = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDownloadMonth(month);
    setModalVisible(false);
  };

  const windowWidth = Dimensions.get("window").width;
  const [chartWidth, setChartWidth] = useState(windowWidth - 20);

  const handleChartLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setChartWidth(width - 20);
  };

  return (
    <View
      style={[styles.screenContainer, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.titleText, { color: theme.color }]}>
          Analytics
        </Text>
        <View
          style={[
            styles.cardContainer,
            { backgroundColor: theme.secondaryBackground },
          ]}
        >
          <View style={styles.accumulationHeader}>
            <Text style={[styles.headerText, { color: theme.color }]}>
              Monthly Accumulation
            </Text>
            <Button
              mode="contained"
              onPress={() => setModalVisible(true)}
              icon="chevron-down"
              contentStyle={styles.buttonContent}
              buttonColor={theme.buttonBackground}
            >
              {`${selectedMonth} ${selectedYear}`}
            </Button>
          </View>
          <View style={styles.statContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.upperText, { color: theme.color }]}>
                Presence
              </Text>
              <Text style={[styles.lowerText, { color: theme.color }]}>23</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.upperText, { color: theme.color }]}>
                Absence
              </Text>
              <Text style={[styles.lowerText, { color: theme.color }]}>0</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.upperText, { color: theme.color }]}>
                Late
              </Text>
              <Text style={[styles.lowerText, { color: theme.color }]}>
                1.2h
              </Text>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Month and Year</Text>
              <ScrollView style={styles.pickerContainer}>
                {years.map((year) => (
                  <View key={year} style={styles.yearContainer}>
                    {months.map((month, index) => {
                      if (year === currentYear && index > currentMonthIndex) {
                        return null;
                      }
                      return (
                        <TouchableOpacity
                          key={`${month}-${year}`}
                          style={[
                            styles.pickerItem,
                            selectedMonth === month && selectedYear === year
                              ? styles.selectedPickerItem
                              : {},
                          ]}
                          onPress={() => handleSelectMonthYear(month, year)}
                        >
                          <Text
                            style={[
                              styles.pickerItemText,
                              selectedMonth === month && selectedYear === year
                                ? styles.selectedPickerItemText
                                : {},
                            ]}
                          >
                            {`${month} ${year}`}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </ScrollView>
              <Button
                mode="contained"
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                buttonColor="black"
              >
                Close
              </Button>
            </View>
          </View>
        </Modal>

        <View
          style={[
            styles.chartContainer,
            { backgroundColor: theme.secondaryBackground },
          ]}
          onLayout={handleChartLayout}
        >
          <View style={styles.chartHeader}>
            <Text style={[styles.chartHeaderText, { color: theme.color }]}>
              Attendance
            </Text>
            <View style={styles.timeFrameContainer}>
              <TouchableOpacity
                style={[
                  styles.timeFrameButton,
                  { backgroundColor: theme.timeFrameBgColor },
                ]}
              >
                <Text
                  style={[
                    styles.timeFrameText,
                    {
                      color: theme.timeFrameText,
                    },
                  ]}
                >
                  1W
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.timeFrameButton,
                  styles.activeTimeFrameButton,
                  { backgroundColor: theme.timeFrameBgColorDark },
                ]}
              >
                <Text
                  style={[
                    styles.timeFrameText,
                    styles.activeTimeFrameText,
                    {
                      color: theme.timeFrameTextDark,
                    },
                  ]}
                >
                  1M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.timeFrameButton,
                  { backgroundColor: theme.timeFrameBgColor },
                ]}
              >
                <Text
                  style={[
                    styles.timeFrameText,
                    {
                      color: theme.timeFrameText,
                    },
                  ]}
                >
                  1Y
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.chartStats}>
              <Text style={[styles.chartStatText, { color: theme.color }]}>
                97.5%
              </Text>
              <Button
                icon="finance"
                mode="text"
                onPress={() => console.log("Pressed")}
                textColor="green"
                style={[
                  styles.chartButton,
                  {
                    backgroundColor: theme.chartButtonBgColor,
                  },
                ]}
              >
                5.2%
              </Button>
              <Text style={[styles.chartPreviousText, { color: theme.color }]}>
                Last Month:92.5%
              </Text>
            </View>
            <LineChart
              data={{
                labels: ["W1", "W2", "W3", "W4"],
                datasets: [
                  {
                    data: [3, 1, 5, 7],
                  },
                ],
              }}
              width={chartWidth}
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "black",
                backgroundGradientTo: "white",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "black",
                },
              }}
              bezier
              style={styles.chartStyle}
            />
          </View>
        </View>
        <Text style={[styles.subtext, { color: theme.color }]}>
          Key Performance Indicator
        </Text>
        <Button
          icon="download-box-outline"
          mode="contained-tonal"
          onPress={() => console.log("Pressed")}
          textColor={theme.buttonText}
          buttonColor={theme.buttonBackground}
          contentStyle={styles.downloadButtonContent}
        >
          {`${downloadMonth} - Download`}
        </Button>
        <Text style={[styles.subtext, { color: theme.color }]}>
          Attendence Summary
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  titleText: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: "500",
  },
  cardContainer: {
    padding: 10,
    borderRadius: 20,
  },
  accumulationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttonContent: {
    flexDirection: "row-reverse",
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  upperText: {
    textAlign: "center",
    fontWeight: "200",
    marginBottom: 10,
  },
  lowerText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 320,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    width: "100%",
    maxHeight: 400,
    marginBottom: 20,
  },
  yearContainer: {
    marginBottom: 10,
  },
  pickerItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  pickerItemText: {
    fontSize: 16,
  },
  selectedPickerItem: {
    backgroundColor: "black",
  },
  selectedPickerItemText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    width: "100%",
  },
  chartContainer: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chartHeaderText: {
    fontSize: 15,
    fontWeight: "600",
  },
  timeFrameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeFrameButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 5,
  },

  timeFrameText: {
    fontSize: 12,
  },
  activeTimeFrameText: {
    color: "white",
  },
  chartStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    alignItems: "flex-end",
  },
  chartStatText: {
    fontSize: 30,
    fontWeight: "400",
  },
  chartButton: {
    marginRight: 60,
    backgroundColor: "#E0FBE2",
  },
  chartPreviousText: {
    fontWeight: "200",
    fontSize: 13,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  subtext: {
    marginVertical: 20,
    fontSize: 15,
    fontWeight: "600",
  },
  downloadButtonContent: {
    flexDirection: "row-reverse",
  },
});

export default AnalyticScreen;
