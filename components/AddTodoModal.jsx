import React from "react";
import { View, Alert, Modal, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import AddTodoData from "../components/today/AddTodoData";

const AddTodoModal = ({ showModal, setShowModal, onTodoAdded }) => {
  // this is the add todo modal which has a component AddTodoData which takes onTodoAdded & setshowmodal to handle opening and closing of modal and onHabbitAdded to update the ui immediately after the adding the todo
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShowModal(!showModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AddTodoData setShowModal={setShowModal} onTodoAdded={onTodoAdded} />
        </View>
      </View>
    </Modal>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.light,
    height: "80%",
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