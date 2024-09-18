import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import { Colors } from "../../../constants/Colors";
import Plus from "../../../components/CustomButton/Plus";
import HabbitsModal from "../../../components/HabbitsModal";
import EditHabitModal from "../../../components/EditHabitModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { useSQLiteContext } from "expo-sqlite";

const Habbits = () => {
  const [habitModal, setHabitModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [habitsByCategory, setHabitsByCategory] = useState({});
 
  
  const db = useSQLiteContext();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      // Fetch habits from the database
      const result = await db.getAllAsync("SELECT * FROM habits");
  
  
      // Group habits by category
      const habits = result.reduce((acc, habit) => {
        // Check if category is valid
        const category = habit.category || "Other"; 
  
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(habit);
        return acc;
      }, {});
  
      // Debugging: Log the grouped habits
      console.log("Habits by category:", habits);
  
      setHabitsByCategory(habits);
    } catch (error) {
      console.log("Error while fetching habits...", error);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await db.runAsync("DELETE FROM habits WHERE id = ?", id);
      fetchHabits();
    } catch (error) {
      console.log("Error while deleting habit...", error);
    }
  };

  const openEditModal = (habit) => {
    setEditHabit(habit);
    setEditModal(true);
  };

  const openConfirmationModal = (habit) => {
    setHabitToDelete(habit);
    setConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete.id);
    }
    setConfirmationModal(false);
  };

  const renderCategory = (category) => (
    <View key={category} style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category} Habits:</Text>
      {habitsByCategory[category] ? (
        habitsByCategory[category].map((habit) => (
          <View key={habit.id} style={styles.habitCard}>
            <View style={styles.cardContent}>
              <View style={styles.habitInfo}>
                <Text style={styles.habitTitle}>{habit.habitName}</Text>
                <Text style={styles.habitDesc}>{habit.description}</Text>
                <Text style={styles.habitDate}>{habit.habitDate}</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => openConfirmationModal(habit)}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/2603/2603105.png",
                    }}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEditModal(habit)}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/143/143437.png",
                    }}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noHabits}>No habits for this category</Text>
      )}
    </View>
  );

  const categories = ["Personal", "Work", "Family", "Sport", "Other"];

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.container}
      >
        <HabbitsModal
          showModal={habitModal}
          setShowModal={setHabitModal}
          onHabbitAdded={fetchHabits}
        />
        <EditHabitModal
          showModal={editModal}
          setShowModal={setEditModal}
          habit={editHabit}
          onUpdate={fetchHabits}
        />
        <ConfirmationModal
          visible={confirmationModal}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmationModal(false)}
          habit={habitToDelete}
        />
        {categories.map(renderCategory)}
      </ScrollView>
      <Plus onPress={() => setHabitModal(true)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.black,
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
    fontWeight: "bold",
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
  noHabits: {
    color: Colors.grey,
    textAlign: "center",
  },
});

export default withCustomHeader(Habbits);