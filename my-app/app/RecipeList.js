import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { getDatabase, ref, push, remove, onChildAdded } from 'firebase/database';
import { app } from '../Firebase/firebase';

export default function RecipeList() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipes, setRecipes] = useState([]);
  const database = getDatabase(app);

  useEffect(() => {
    const recipesRef = ref(database, 'recipe/');

    onChildAdded(recipesRef, (snapshot) => {
      const recipe = snapshot.val();
      setRecipes((prevRecipes) => [
        ...prevRecipes,
        { id: snapshot.key, ...recipe },
      ]);
    });
  }, []);

  const handleAddRecipe = () => {
    if (recipeName.trim() === '' || recipeDescription.trim() === '') {
      return;
    }

    const recipe = {
      name: recipeName,
      description: recipeDescription,
    };

    const newRecipeRef = push(ref(database, 'recipe/'), recipe);

    setRecipeName('');
    setRecipeDescription('');
  };

  const handleDeleteRecipe = (recipeId) => {
    const recipeRef = ref(database, `recipe/${recipeId}`);
    remove(recipeRef);
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
  };

  const exitRecipe = () => {
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
        <Text style={styles.title}>REFLECTION LOG</Text>
          <View style={styles.innerContainer}>
            <Text>Title:</Text>
            <TextInput
              style={styles.inputText}
              value={recipeName}
              onChangeText={(text) => setRecipeName(text)}
            />
            <Text>Notes:</Text>
            <TextInput
              style={{ ...styles.inputText, ...styles.inputDes }}
              value={recipeDescription}
              onChangeText={(text) => setRecipeDescription(text)}
              multiline
            />

            <TouchableOpacity onPress={handleAddRecipe} style={styles.addRecipe}>
              <Text style={styles.addRecipeText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={exitRecipe} style={styles.exitBtn}>
              <Text style={styles.exitText}>EXIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recipeListContainer}>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                name={recipe.name}
                description={recipe.description}
                onDelete={() => handleDeleteRecipe(recipe.id)}
              />
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
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
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

  innerContainer: {
    width: '80%',
    padding: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    borderRadius: 25,
  },

  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },

  inputDes: {
    height: 100,
    color: 'white',
  },

  addRecipe: {
    backgroundColor: '#FF90BC',
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 25,
  },

  addRecipeText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  exitBtn: {
    backgroundColor: '#FFC47E',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 25,
  },

  exitText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  recipeListContainer: {
    width: '80%',
  },

  recipeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  deleteButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});