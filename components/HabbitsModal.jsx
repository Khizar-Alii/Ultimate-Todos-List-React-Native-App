import React from "react";
import { View, Alert, Modal, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import AddHabbitData from "../components/habbits/AddHabbitData";

const HabbitsModal = ({ showModal, setShowModal, onHabbitAdded }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AddHabbitData setShowModal={setShowModal} onHabbitAdded={onHabbitAdded} />
        </View>
      </View>
    </Modal>
  );
};

export default HabbitsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.light,
    height: "90%",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});