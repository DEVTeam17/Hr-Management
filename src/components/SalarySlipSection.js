import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import themeContext from "../context/themeContext";

const SalarySlipSection = ({ title, data }) => {
  const theme = useContext(themeContext);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={{ color: "white" }}>{item.label}</Text>
            {item.details && (
              <Text style={styles.detailsText}>{item.details}</Text>
            )}
          </View>
          <Text style={{ color: "white" }}>{item.amount}</Text>
        </View>
      ))}
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  labelContainer: {
    flexDirection: "column",
  },
  detailsText: {
    color: "gray",
  },
  divider: {
    marginVertical: 10,
  },
});

export default SalarySlipSection;
