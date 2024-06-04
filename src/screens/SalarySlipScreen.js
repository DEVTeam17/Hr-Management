import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Divider } from "react-native-paper";
import SalarySlipHeader from "../components/SalarySlipHeader";
import SalarySlipSection from "../components/SalarySlipSection";
import themeContext from "../context/themeContext";

const SalarySlipScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const data = {
    user: {
      name: "Mike Cooper",
      position: "Marketing Officer",
      id: "DE3824-MO4",
      avatar: require("../assets/anthony.jpg"),
    },
    month: "September 2023",
    earnings: [
      { label: "Basic salary", amount: "$2,500.00" },
      { label: "Overtime pay", amount: "$540.00", details: "12 hours x $45" },
      { label: "Bonuses", amount: "$100.00" },
      { label: "Reimbursements", amount: "$61.00" },
    ],
    deductions: [
      { label: "Income tax", amount: "$30.00" },
      { label: "Health Insurance", amount: "$45.00" },
      { label: "Retirement Contributions", amount: "$35.00" },
      { label: "Loan Repayments", amount: "$75.00" },
    ],
  };

  const calculateTotal = (items) => {
    return items
      .reduce((total, item) => {
        const amount = parseFloat(item.amount.replace(/[$,]/g, ""));
        return total + amount;
      }, 0)
      .toFixed(2);
  };

  const totalEarnings = `$${calculateTotal(data.earnings)}`;
  const totalDeductions = `$${calculateTotal(data.deductions)}`;
  const netSalary = `$${(
    calculateTotal(data.earnings) - calculateTotal(data.deductions)
  ).toFixed(2)}`;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View
          style={[
            styles.backgroundContainer,
            { backgroundColor: theme.salarySlipContainer },
          ]}
        >
          <SalarySlipHeader {...data.user} />
          <View style={styles.row}>
            <Text style={{ color: theme.white }}>DEC</Text>
            <Button
              mode="contained"
              textColor={theme.black}
              buttonColor={theme.white}
              onPress={() => console.log("Pressed")}
            >
              {data.month}
            </Button>
          </View>
          <View
            style={[styles.dashedDivider, { borderBottomColor: theme.white }]}
          />
          <SalarySlipSection title="Earnings" data={data.earnings} />
          <View style={styles.row}>
            <Text style={[styles.boldText, { color: theme.white }]}>
              Total earnings
            </Text>
            <Text style={[styles.boldText, { color: theme.white }]}>
              {totalEarnings}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <SalarySlipSection title="Deductions" data={data.deductions} />
          <View style={styles.row}>
            <Text style={[styles.boldText, { color: theme.white }]}>
              Total deductions
            </Text>
            <Text style={[styles.boldText, { color: theme.white }]}>
              {totalDeductions}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.row}>
            <Text style={[styles.boldText, { color: theme.white }]}>
              Net Salary
            </Text>
            <Text style={[styles.boldText, { color: theme.white }]}>
              {netSalary}
            </Text>
          </View>
          <View
            style={[styles.dottedDivider, { borderBottomColor: theme.white }]}
          />
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("DashboardScreen")}
          style={[
            styles.doneButton,
            { backgroundColor: theme.buttonBackground },
          ]}
        >
          Done
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    marginVertical: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  backgroundContainer: {
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
  },
  dashedDivider: {
    borderBottomWidth: 2,
    borderStyle: "dashed",
    marginVertical: 10,
  },
  dottedDivider: {
    borderBottomWidth: 2,
    borderStyle: "dotted",
  },
  doneButton: {
    marginVertical: 20,
  },
});

export default SalarySlipScreen;
