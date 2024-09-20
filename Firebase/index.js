import { db } from "../config/firebaseConfig";
import { doc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";

//  to add todo in the firebase
export const uploadTodosFirebase = async ({id ,  task, desc, selectedCategory, date }) => {
  try {
    const docID = Date.now().toString();
    await setDoc(doc(db, "todos", docID), {
      id : id,
      task: task,
      desc: desc,
      selectedCategory: selectedCategory || "Other",
      date: date.toDateString(),
    });
    return true;
  } catch (error) {
    console.log("Error uploading todo to Firebase:", error);
    return false;
  }
};

//  to edit todo in the firebase
export const editTodosFirebase = async ({
  docID,
  task,
  desc,
  selectedCategory,
  date,
}) => {
  try {
    const todoRef = doc(db, "todos", docID);
    // Update the document
    await updateDoc(todoRef, {
      task: task,
      desc: desc,
      selectedCategory: selectedCategory || "Other",
      date: date.toDateString(),
    });

    console.log("Todo successfully edited in Firebase!");
    return true;
  } catch (error) {
    console.log("Error editing todo in Firebase:", error);
    return false;
  }
};

// to update todo:
export const GetAllTodosandUpdateWithId = async (id, task, desc, date) =>{
  try {
    const q = query(
      collection(db, "todos"),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        // update each matching document
        await updateDoc(docSnapshot.ref, {
          task: task,
          desc: desc,
          date: date.toDateString(),
        });
        console.log("Todo successfully update from Firebase with id:", id);
      });
    }
    return true;
  } catch (error) {
    console.log("Error deleting todo from Firebase:", error);
    return false;
  }
}




// to delete todos
export const GetAllTodosandDelWithId = async (id) =>{
  try {
    const q = query(
      collection(db, "todos"),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        // Delete each matching document
        await deleteDoc(docSnapshot.ref);
        console.log("Todo successfully deleted from Firebase with id:", id);
      });
      return true;
    }
    return true;
  } catch (error) {
    console.log("Error deleting todo from Firebase:", error);
    return false;
  }

}


// when checkbox is checked update in on firebase
export const updateCheckboxInFirebase = async (id, isChecked) => {
  try {
    const q = query(
      collection(db, "todos"),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        // Update the isChecked field in Firebase
        await updateDoc(docSnapshot.ref, {
          isChecked: isChecked,
        });
        console.log("Checkbox state successfully updated in Firebase for id:", id);
      });
    }
  } catch (error) {
    console.error("Error updating checkbox in Firebase:", error);
  }
};