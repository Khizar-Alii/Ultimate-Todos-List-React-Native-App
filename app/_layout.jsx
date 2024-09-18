import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

const initializeDatabase = async (db) => {
  try {
    // Initialize todos table
    await db.execAsync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS todos (
       id INTEGER PRIMARY KEY AUTOINCREMENT, 
       task TEXT NOT NULL, 
       desc TEXT, 
       selectedCategory TEXT DEFAULT 'Other', 
       date TEXT NOT NULL, 
       isChecked INTEGER NOT NULL DEFAULT 0
      )`
    );

    // Initialize habits table
    await db.execAsync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS habits (
       id INTEGER PRIMARY KEY AUTOINCREMENT, 
       habitName TEXT NOT NULL, 
       description TEXT, 
       category TEXT DEFAULT 'Other', 
       habitDate TEXT NOT NULL, 
       frequency TEXT DEFAULT 'Daily'
      )`
    );

    console.log("Database initialized with todos and habits tables");
  } catch (error) {
    console.log("Error while initializing database", error);
  }
};

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="todo.db" onInit={initializeDatabase}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SQLiteProvider>
  );
}