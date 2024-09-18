import { View, Text, Alert, Modal,StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";


// this is side bar modal which has some navigations and other details as well for this the logic is define in the high order component which handles opening and closing of this modal.

export default function ModalData({ modalVisible, setModalVisible }) {
    const route = useRoute();
    const home = route.name == "today/index" ? 'home' : null
    const habbits = route.name == "habbits/index" ? 'habbits' : null
    const category = route.name == "category/index" ? 'category' : null

  // Get the current date and format it
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePress = (route) =>{
    router.push(route)
    setModalVisible(false);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flex: 1 }}>
            <View style={styles.top}>
            <View style={{flexDirection : 'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={styles.title}>To-Do</Text>
                <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                <AntDesign name="closecircleo" size={24} color={Colors.grey} />
                </TouchableOpacity>
            </View>
              <Text style={styles.date}>{dayName}</Text>
              <Text style={[styles.date,{color:'grey'}]}>{formattedDate}</Text>
            </View>
            <View style={styles.middle}>
                <TouchableOpacity style={[styles.btn, home ? styles.home : "" ]} onPress={()=>handlePress("/today")} >
                    <AntDesign name="home" size={24} color={home ? Colors.dark :  Colors.grey} />
                    <Text style={styles.btnText}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, habbits ? styles.timer : "" ]} onPress={()=>handlePress("/habbits")}>
                    <Feather name="star" size={24} color={habbits ? Colors.dark : Colors.grey} />
                    <Text style={styles.btnText}>habbits</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, category ? styles.category : "" ]} onPress={()=>handlePress("/category")} >
                    <MaterialIcons name="category" size={24} color={category ? Colors.dark  : Colors.grey} />
                    <Text style={styles.btnText}>CATEGORY</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={[styles.btn]} onPress={()=>{}} >
                    <AntDesign name="setting" size={24} color={Colors.grey} />
                    <Text style={styles.btnText}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]} onPress={()=>{}} >
                    <AntDesign name="staro" size={24} color={Colors.grey} />
                    <Text style={styles.btnText}>Rate This App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]} onPress={()=>{}} >
                    <MaterialIcons name="backup" size={24} color={Colors.grey} />
                    <Text style={styles.btnText}>Backup</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]} onPress={()=>{}} >
                    <AntDesign name="contacts" size={24} color={Colors.grey} />
                    <Text style={styles.btnText}>Contact us</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.dark,
    height: "100%",
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  top: {
    gap: 10,
    padding: 20,
    borderBottomWidth : 1,
    borderColor : 'grey'
  },
  title: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "700",
    letterSpacing: 2,
  },
  date : {
    fontSize : 15,
    color : Colors.light,
    fontWeight : '500',
    textTransform : "uppercase",
    letterSpacing : 1
  },
  middle : {
    gap: 10,
    padding: 20,
    borderBottomWidth : 1,
    borderColor : 'grey'
  },
  btn : {
    flexDirection : 'row',
    alignItems : 'center',
    gap : 10,
    padding : 10,
  },
  btnText : {
    color : Colors.light,
    letterSpacing : 1
  },
  home : {
    backgroundColor : Colors.primary,
    borderRadius : 50
  },
  category : {
    backgroundColor : Colors.primary,
    borderRadius : 50
  },
  timer : {
    backgroundColor : Colors.primary,
    borderRadius : 50
  },
  bottom : {
    gap: 10,
    padding: 20,
    borderBottomWidth : 1,
    borderColor : 'grey'
  }
});
