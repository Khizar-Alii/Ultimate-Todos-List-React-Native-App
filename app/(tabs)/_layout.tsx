import { Tabs } from "expo-router";
import {  StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle : {
            borderTopLeftRadius  :20,
            borderTopRightRadius  :20,
            backgroundColor : Colors.dark,
            borderTopWidth : 0,
            elevation : 0,
            height : 60,
            paddingBottom : 4,
            position : 'absolute'
        }
      }}
    >
      <Tabs.Screen
        name="today/index"
        options={{
          title: "Today",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="today"
              size={20}
              color={focused ? Colors.light : "grey"}
              style={focused ? styles.icon : null}
            />
          ),
        }}
      />
      <Tabs.Screen name="tasks/index" options={{
          title: "Tasks",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="task-alt"
              size={20}
              color={focused ? Colors.light : "grey"}
              style={focused ? styles.icon : null}
            />
          ),
        }}/>
      <Tabs.Screen name="habbits/index" options={{
          title: "Habbits",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="star"
              size={20}
              color={focused ? Colors.light : "grey"}
              style={focused ? styles.icon : null}
            />
          ),
        }}/>
      <Tabs.Screen name="category/index" options={{
          title: "Category",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="category"
              size={20}
              color={focused ? Colors.light : "grey"}
              style={focused ? styles.icon : null}
            />
          ),
        }}/>
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
});
