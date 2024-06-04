import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { Icon, Button, Checkbox } from "react-native-paper";

import themeContext from "../context/themeContext";
import DefaultCheckedItem from "../components/DefaultCheckedItem";

const ResignScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.resignText, { color: theme.color }]}>Resign</Text>
      <View style={styles.centerContent}>
        <Icon source="book-cancel-outline" color={theme.color} size={200} />
        <Text style={[styles.text, { color: theme.color }]}>
          Fiuh... you haven’t submitted any resign letter. Be happy in your
          work!
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          buttonColor={theme.buttonBackground}
          style={styles.button}
          textColor={theme.buttonText}
          onPress={() => setModalVisible(true)}
        >
          Submit Resign Letter
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View
            style={[styles.modalContent, { backgroundColor: theme.background }]}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={[styles.contentTitle, { color: theme.color }]}>
                Read this carefully before submitting your resign letter
              </Text>
              <DefaultCheckedItem text="You are required to provide a notice period as stipulated in your contract." />
              <DefaultCheckedItem text="You are encouraged to participate in an exit interview to provide valuable feedback" />
              <DefaultCheckedItem text="You must return all company property, including but not limited to access cards, etc." />
              <DefaultCheckedItem text="You are required to complete the clearance procedure as outlined by the HR department." />
              <View style={styles.checkboxContainer}>
                <Checkbox
                  color={theme.color}
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={[styles.checkboxText, { color: theme.color }]}>
                  By submitting your resignation, you acknowledge that you have
                  read and understood the terms and conditions outlined above.
                </Text>
              </View>
            </ScrollView>
            <View style={styles.modalButtonContainer}>
              <Button
                style={styles.modalButton}
                mode="contained"
                onPress={() => setModalVisible(!modalVisible)}
                buttonColor={theme.buttonBackground}
              >
                Cancel
              </Button>
              <Button
                style={styles.modalButton}
                buttonColor={theme.menuBackground}
                mode="outlined"
                textColor={theme.color}
                onPress={() => {
                  navigation.navigate("ResignFormScreen");
                  setModalVisible(!modalVisible);
                }}
              >
                Yes, I Will
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  resignText: {
    fontWeight: "bold",
    marginTop: 50,
    fontSize: 20,
    textAlign: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
  },
  buttonWrapper: {
    width: "100%",
    paddingBottom: 30,
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  contentTitle: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ResignScreen;
