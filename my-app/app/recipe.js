import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { getDatabase, ref, push, remove, onChildAdded } from 'firebase/database';
import { app } from '../Firebase/firebase';
import { router } from 'expo-router';

export default function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const database = getDatabase(app);

  useEffect(() => {
    const tasksRef = ref(database, 'tasks/');

    onChildAdded(tasksRef, (snapshot) => {
      const task = snapshot.val();
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: snapshot.key, ...task },
      ]);
    });
  }, []);

  const handleAddTask = () => {
    if (task.trim() === '') {
      return;
    }

    const newTask = {
      description: task,
    };

    const newTaskRef = push(ref(database, 'tasks/'), newTask);

    setTask('');
  };

  const handleDeleteTask = (taskId) => {
    const taskRef = ref(database, `tasks/${taskId}`);
    remove(taskRef);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const exitTodoList = () => {
    router.replace('/HomePage'); 
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://assets-global.website-files.com/5a9ee6416e90d20001b20038/635acf1a3e103d4823c4ca6a_horizontal%20-%202022-10-27T213400.071.svg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.epiksOverlay} />
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.title}>TO-DO LIST</Text>
          <View style={styles.innerContainer}>
            <Text>Enter Task:</Text>
            <TextInput
              style={styles.inputText}
              value={task}
              onChangeText={(text) => setTask(text)}
            />

            <TouchableOpacity onPress={handleAddTask} style={styles.addTask}>
              <Text style={styles.addTaskText}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={exitTodoList} style={styles.exitBtn}>
            <Text style={styles.exitText}>EXIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskListContainer}>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <Text>{task.description}</Text>
                <TouchableOpacity onPress={() => handleDeleteTask(task.id)} style={styles.deleteTask}>
                  <Text style={styles.deleteTaskText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  epiksOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  outerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },

  innerContainer: {
    width: '80%',
    padding: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
  },

  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },

  addTask: {
    backgroundColor: '#FF90BC',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 25,
  },

  addTaskText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    
  },

  taskListContainer: {
    width: '80%',
    marginTop: 20,
    
  },

  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: '#FFF78A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 3,
    width: '80%',
  },

  exitBtn: {
    backgroundColor: '#FFC47E',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 25,
  },

  exitText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  
  deleteTask: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },

  deleteTaskText: {
    color: 'white',
  },
});
