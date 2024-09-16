import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/Colors";

const Plus = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.btnText}>
        <AntDesign name="plus" size={50} color="white" />
      </Text>
    </TouchableOpacity>
  );
};

export default Plus;

const styles = StyleSheet.create({
    btnContainer:{
        position : 'absolute',
        right : 20,
        bottom : 70,
        backgroundColor : Colors.primary,
        borderRadius : 99
    },
    btnText:{}
});
