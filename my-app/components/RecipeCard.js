import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../Firebase/firebase';

export default function RecipeCard({ name, description, onDelete }) {
  const [recipeList, setRecipeList] = useState([]);
  const database = getDatabase(app);

  useEffect(() => {
    const dbRef = ref(database, 'notes/');
    onValue(dbRef, (snapshot) => {
      const recipe = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        recipe.push({ ...childData, id: childKey });
      });
      setRecipeList(recipe);
    });
  }, []);

  return (
    <View style={styles.cardOuter}>
      <View style={styles.card}>
        <View style={{ padding: 16 }}>
          <Text style={styles.recipeName}>{name}</Text>
          <Text style={styles.recipeDescription}>{description}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 25,
    backgroundColor: '#FFF78A',
    
  },

  cardOuter: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },

  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  recipeDescription: {
    fontSize: 14,
  },

  imageRecipe: {
    width: '100%', 
    height: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  deleteButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },

});