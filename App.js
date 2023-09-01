/**
 * The above function is a React component that sets up the navigation container for a React Native
 * app.
 * @returns The App component is being returned.
 * 
 * 
 * 
The routes were --- 
he Flask app is returning JSON responses for various routes. The routes include:
# - "/movies": Returns details of a movie.
# - "/like": Adds a movie to the liked movies list.
# - "/liked": Returns the list of liked movies.
# - "/dislike": Adds a movie to the not liked movies list.
# - "/did_not_watch": Adds a movie to the did not watch list.
# - "/popular_movies": Returns the list of popular movies .
# - "/recommended_movies": Returns the list of recommended movies .
 */
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNav from "./navigation/stackNav";
import { View,SafeAreaView,Platform,StatusBar } from "react-native";


export default function App() {
  return(
    <View style={{flex:1}}>
     { /* The `<SafeAreaView>` component is used to ensure that the content of the app is displayed
      within the safe area boundaries of the device. The safe area is the portion of the screen that
      is visible and not obstructed by notches, rounded corners, or other device-specific features. */}
      <SafeAreaView style={{marginTop:Platform.OS=="android"?StatusBar.currentHeight:0}}/>
      {/* The `<NavigationContainer>` component is a container that holds the navigation state of the
      app. It is responsible for managing the app's navigation hierarchy and rendering the
      appropriate screens based on the current navigation state. */}
      <NavigationContainer>
        <StackNav/>
      </NavigationContainer>
    </View>
  );
}

