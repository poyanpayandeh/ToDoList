import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const handleAddTask = () => {
    if (task === null) {}
    else {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  }

  return (
    <View style={styles.container}>
  
      {/* Todays's Tasks */}
      <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={{ marginBottom: 125}}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>To Do List!</Text>

          <View style={styles.items}>
            {/* This is where the tasks will go */}
            {
              taskItems.map((item, index) => {
                return(
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}></Task>
                </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Enter task'} value={task} onChangeText={text => setTask(text)}></TextInput>

        <View style={styles.scrollBG}></View>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>

        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20, 
  },

  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },

  addText: {

  }
});
