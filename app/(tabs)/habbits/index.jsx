import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import { habits } from "../../../constants/habbits";
import { Colors } from "../../../constants/Colors";
import NoTodo from "../../../components/today/NoTodo";
import Plus from "../../../components/CustomButton/Plus";
import AddTodoModal from "../../../components/AddTodoModal";

const Habbits = () => {
  // Group habits by category
  const [habitModal, setHabitModal] = useState(false);
  const groupedHabits = habits.reduce((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = [];
    }
    acc[habit.category].push(habit);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {habits.length === 0 ? (
        <NoTodo />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {Object.keys(groupedHabits).map((category) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {groupedHabits[category].map((habit) => (
                <View key={habit.id} style={styles.habitCard}>
                  <View style={styles.cardContent}>
                    <View style={styles.habitInfo}>
                      <Text style={styles.habitTitle}>{habit.title}</Text>
                      <Text style={styles.habitDesc}>{habit.desc}</Text>
                      <Text style={styles.habitDate}>Date: {habit.date}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity>
                        <Image
                          source={{ uri: "https://cdn-icons-png.flaticon.com/128/2603/2603105.png" }}
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={{ uri: "https://cdn-icons-png.flaticon.com/128/9512/9512757.png" }}
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
      <Plus onPress={() => setHabitModal(true)} />
      <AddTodoModal showModal={habitModal} setShowModal={setHabitModal} />
    </View>
  );
};

export default withCustomHeader(Habbits);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.black,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
    textTransform: "uppercase",
  },
  habitCard: {
    backgroundColor: Colors.dark,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  habitDesc: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 5,
    marginBottom: 10,
  },
  habitDate: {
    fontSize: 14,
    color: Colors.black,
    fontWeight :'bold'

  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4, 
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
});