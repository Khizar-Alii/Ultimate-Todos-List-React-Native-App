import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity, View, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Modal from "@/components/ModalData"; 
import { Colors } from "@/constants/Colors";

const withCustomHeader = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTitleStyle: {
          color: Colors.light,
          fontSize: 28,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ paddingHorizontal: 20, alignItems: "center" }}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome6
              name="bars-staggered"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{alignItems: "center" }}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Image
                source={{
                  uri: "https://lh3.google.com/u/0/ogw/AF2bZyhwcFddRCZA27biTphjJWqx77m4t7KJSG8rOwncStVqSQ=s32-c-mo",
                }}
                style={{ width: 30, height: 30, borderRadius: 99 }}
              />
            </TouchableOpacity>
          </View>
        ),
      });
    }, []);

    return (
      <>
        <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withCustomHeader;